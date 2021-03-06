import { getRepository, Repository } from "typeorm";

import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDto";
import Rental from "../entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository.";

class RentalRepoisoty implements IRentalRepository {
	private repository: Repository<Rental>

	constructor() {
		this.repository = getRepository(Rental)
	}

	async findOpenRentalByCar(car_id: string): Promise<Rental> {
		const rental = await this.repository.findOne({
			where: { car_id, end_date: null }
		})

		return rental
	}

	async findOpenRentalByUser(user_id: string): Promise<Rental> {
		const rental = await this.repository.findOne({
			where: { user_id, end_date: null }
		})

		return rental
	}

	async create({
		car_id,
		expected_return_date,
		user_id,
		id,
		end_date,
		total,
		start_date,
	}: ICreateRentalDTO): Promise<Rental> {
		const rental = this.repository.create({
			car_id,
			expected_return_date,
			user_id,
			id,
			end_date,
			total,
			start_date,
		})

		await this.repository.save(rental)

		return rental
	}

	async findById(id: string): Promise<Rental> {
		const rental = await this.repository.findOne({ id })

		return rental
	}

	async findRentalsByUserId(user_id: string): Promise<Rental[]> {
		const rentals = await this.repository.find({
			where: { user_id },
			relations: ['car']
		})

		return rentals
	}
}

export default RentalRepoisoty