import { getRepository, Repository } from "typeorm"

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository"
import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO"
import User from "@modules/accounts/infra/typeorm/entities/User"

class UserRepository implements IUserRepository {
	private repository: Repository<User>

	constructor() {
		this.repository = getRepository(User)
	}

	async create({
		name,
		driver_license,
		email,
		password,
		avatar,
		id
	}: ICreateUserDTO): Promise<void> {
		const user = this.repository.create({
			name,
			email,
			driver_license,
			password,
			avatar,
			id
		})

		await this.repository.save(user)
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.repository.findOne({ email })

		return user
	}

	async findById(id: string): Promise<User> {
		const user = await this.repository.findOne(id)

		return user
	}
}

export default UserRepository