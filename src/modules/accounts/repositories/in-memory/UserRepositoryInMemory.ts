import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO"
import User from "@modules/accounts/infra/typeorm/entities/User";

class UserRepositoryInMemory implements IUserRepository {
	users: User[] = []

	async create({ driver_license, password, email, name }: ICreateUserDTO): Promise<void> {
		const user = new User()

		Object.assign(user, {
			driver_license,
			password,
			email,
			name
		})

		this.users.push(user)
	}

	async findByEmail(email: string): Promise<User> {
		const user = this.users.find(user => user.email === email)

		return user
	}

	async findById(id: string): Promise<User> {
		const user = this.users.find(user => user.id === id)

		return user
	}

}

export default UserRepositoryInMemory