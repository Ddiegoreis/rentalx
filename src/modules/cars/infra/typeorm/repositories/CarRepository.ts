import { getRepository, Repository } from "typeorm";

import Car from "../entities/Car";
import ICreateCarDTO from "@modules/cars/dtos/ICreateCarDTO";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";

class CarRepository implements ICarRepository {
	private repository: Repository<Car>

	constructor() {
		this.repository = getRepository(Car)
	}

	async create({
		brand,
		category_id,
		daily_rate,
		description,
		fine_amount,
		license_plate,
		name
	}: ICreateCarDTO): Promise<Car> {
		const car = this.repository.create({
			brand,
			category_id,
			daily_rate,
			description,
			fine_amount,
			license_plate,
			name
		})

		this.repository.save(car)

		return car
	}

	async findByLicensePlate(license_plate: string): Promise<Car> {
		const car = await this.repository.findOne({ license_plate })

		return car
	}
}

export default CarRepository