import { inject, injectable } from "tsyringe"

import Car from "@modules/cars/infra/typeorm/entities/Car"
import { ICarRepository } from "@modules/cars/repositories/ICarRepository"
import { AppError } from "@shared/errors/AppError"
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository"

interface IRequest {
	car_id: string
	specifications_id: string[]
}

@injectable()
class CreateCarSpecificationUseCase {
	constructor(
		@inject('CarRepository')
		private carsRepository: ICarRepository,
		@inject('SpecificationRepository')
		private specificationsRepository: ISpecificationRepository
	) { }

	async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
		const car = await this.carsRepository.findById(car_id)

		if (!car)
			throw new AppError('Car does not exists')

		const specifications = await this.specificationsRepository.findByIds(specifications_id)

		if (!specifications)
			throw new AppError('Specifications does not exists')

		car.specifications = specifications

		await this.carsRepository.create(car)

		return car
	}
}

export default CreateCarSpecificationUseCase