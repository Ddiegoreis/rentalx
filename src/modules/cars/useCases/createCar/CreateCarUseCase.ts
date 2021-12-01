import { inject, injectable } from "tsyringe";

import Car from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
	name: string
	description: string
	daily_rate: number
	license_plate: string
	fine_amount: number
	brand: string
	category_id: string
}

@injectable()
class CreateCarUseCase {
	constructor(
		@inject('CarRepository')
		private carsRepository: ICarRepository
	) { }

	async execute({
		brand,
		category_id,
		daily_rate,
		description,
		fine_amount,
		license_plate,
		name
	}: IRequest): Promise<Car> {
		const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate)

		if (carAlreadyExists)
			throw new AppError('Car already exists')

		const car = await this.carsRepository.create({
			brand,
			category_id,
			daily_rate,
			description,
			fine_amount,
			license_plate,
			name
		})

		return car
	}
}

export default CreateCarUseCase