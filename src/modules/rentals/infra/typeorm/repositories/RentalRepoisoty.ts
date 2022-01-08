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
		const car = await this.repository.findOne({ car_id })

		return car
	}

	async findOpenRentalByUser(user_id: string): Promise<Rental> {
		const car = await this.repository.findOne({ user_id })

		return car
	}

	async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
		const rental = this.repository.create({
			car_id,
			user_id,
			expected_return_date
		})

		await this.repository.save(rental)

		return rental
	}
}

export default RentalRepoisoty