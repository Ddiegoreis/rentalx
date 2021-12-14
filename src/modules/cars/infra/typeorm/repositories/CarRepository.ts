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
		name,
		specifications,
		id
	}: ICreateCarDTO): Promise<Car> {
		const car = this.repository.create({
			brand,
			category_id,
			daily_rate,
			description,
			fine_amount,
			license_plate,
			name,
			specifications,
			id
		})

		this.repository.save(car)

		return car
	}

	async findByLicensePlate(license_plate: string): Promise<Car> {
		const car = await this.repository.findOne({ license_plate })

		return car
	}

	async findAllAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
		const carsQuerry = await this.repository
			.createQueryBuilder('c')
			.where('available = :available', { available: true })

		if (brand)
			carsQuerry.andWhere('c.brand = :brand', { brand })

		if (name)
			carsQuerry.andWhere('c.name = :name', { name })

		if (category_id)
			carsQuerry.andWhere('c.category_id = :category_id', { category_id })

		const cars = await carsQuerry.getMany()

		return cars
	}

	async findById(id: string): Promise<Car> {
		const car = await this.repository.findOne({ id })

		return car
	}
}

export default CarRepository