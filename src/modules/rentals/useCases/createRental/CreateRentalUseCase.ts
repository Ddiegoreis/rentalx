import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository.";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRequest {
	user_id: string
	car_id: string
	expected_return_date: Date
}

// @injectable()
class CreateRentalUseCase {
	constructor(
		// @inject()
		private rentalRepository: IRentalRepository
	) { }

	async execute({ car_id, expected_return_date, user_id }: IRequest): Promise<Rental> {
		const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id)

		if (carUnavailable)
			throw new AppError('Car is unavailable.')

		const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id)

		if (rentalOpenToUser)
			throw new AppError(`There's a rental in progress for this user.`)

		const rental = await this.rentalRepository.create({
			user_id,
			car_id,
			expected_return_date
		})

		return rental
	}
}

export default CreateRentalUseCase