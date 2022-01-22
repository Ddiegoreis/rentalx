import { inject, injectable } from "tsyringe"

import Rental from "@modules/rentals/infra/typeorm/entities/Rental"
import { ICarRepository } from "@modules/cars/repositories/ICarRepository"
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository."
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"

interface IRequest {
	id: string
	user_id: string
}

@injectable()
class DevolutionRentalUseCase {
	constructor(
		@inject('RentalRepository')
		private rentalRepository: IRentalRepository,
		@inject('DateProvider')
		private dateProvider: IDateProvider,
		@inject('CarRepository')
		private carRepository: ICarRepository
	) { }

	async execute({
		id,
		user_id
	}: IRequest): Promise<Rental> {
		const rental = await this.rentalRepository.findById(id)
		const car = await this.carRepository.findById(rental.car_id)

		const minimumDaily = 1

		if (!rental)
			throw new AppError("Rental does not exists!")

		const dateNow = this.dateProvider.dateNow()

		let daily = this.dateProvider.differenceInDays(rental.start_date, dateNow)

		if (daily <= 0)
			daily = minimumDaily

		const delay = this.dateProvider.differenceInDays(
			rental.expected_return_date,
			dateNow
		)

		let total = 0

		if (delay > 0) {
			const calculate_fine = delay * car.fine_amount
			total = calculate_fine
		}

		total += daily * car.daily_rate

		rental.end_date = this.dateProvider.dateNow()
		rental.total = total

		await this.rentalRepository.create(rental)
		await this.carRepository.updateAvailable(car.id, true)

		return rental
	}
}

export default DevolutionRentalUseCase