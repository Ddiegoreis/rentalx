import { inject, injectable } from "tsyringe";

import Car from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";

interface IRequest {
	category_id?: string
	brand?: string
	name?: string
}

@injectable()
class ListAvailableCarsUseCase {
	constructor(
		@inject('CarRepository')
		private carRepository: ICarRepository
	) { }

	async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
		const cars = await this.carRepository.findAllAvailable(brand, category_id, name)

		return cars
	}
}

export default ListAvailableCarsUseCase