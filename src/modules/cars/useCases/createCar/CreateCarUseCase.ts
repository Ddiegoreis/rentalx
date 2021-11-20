import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { inject, injectable } from "tsyringe";

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
		@inject('CarsRepository')
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
	}: IRequest): Promise<void> {
		this.carsRepository.create({
			brand,
			category_id,
			daily_rate,
			description,
			fine_amount,
			license_plate,
			name
		})
	}
}

export default CreateCarUseCase