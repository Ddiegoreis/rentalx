import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository.";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";

interface IRequest {
	user_id: string
	car_id: string
	expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {
	constructor(
		@inject('RentalRepository')
		private rentalRepository: IRentalRepository,
		@inject('DateProvider')
		private dateProvider: IDateProvider,
		@inject('CarRepository')
		private carRepository: ICarRepository
	) { }

	async execute({ car_id, expected_return_date, user_id }: IRequest): Promise<Rental> {
		const minimumTime = 24

		const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id)

		if (carUnavailable)
			throw new AppError('Car is unavailable.')

		const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id)

		if (rentalOpenToUser)
			throw new AppError(`There's a rental in progress for this user.`)

		const dateNow = this.dateProvider.dateNow()

		const compareDate = this.dateProvider.compareInHours(dateNow, expected_return_date)

		if (compareDate < minimumTime)
			throw new AppError(`Invalid return time`)

		const rental = await this.rentalRepository.create({
			user_id,
			car_id,
			expected_return_date
		})

		await this.carRepository.updateAvailable(car_id, false)

		return rental
	}
}

export default CreateRentalUseCase