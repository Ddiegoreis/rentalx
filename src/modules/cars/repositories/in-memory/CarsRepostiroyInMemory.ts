import ICreateCarDTO from "@modules/cars/dtos/ICreateCarDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "../ICarRepository";

class CarsRepositoryInMemmory implements ICarRepository {
	cars: Car[] = []

	async create({
		brand,
		category_id,
		daily_rate,
		description,
		fine_amount,
		license_plate,
		name
	}: ICreateCarDTO): Promise<void> {
		const car = new Car()

		Object.assign(car, {
			brand,
			category_id,
			daily_rate,
			description,
			fine_amount,
			license_plate,
			name
		})

		this.cars.push(car)
	}
}

export default CarsRepositoryInMemmory