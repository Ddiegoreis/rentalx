import { hash } from "bcrypt"
import { inject, injectable } from "tsyringe"

import { AppError } from "@errors/AppError"
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository"
import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO"
@injectable()
class CreateUserUseCase {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository
	) { }

	async execute({ name, driver_license, email, password }: ICreateUserDTO): Promise<void> {
		const userAlreadyExists = await this.userRepository.findByEmail(email)

		if (userAlreadyExists)
			throw new AppError("User already exists")

		const passwordHash = await hash(password, 8)

		await this.userRepository.create({
			name,
			driver_license,
			email,
			password: passwordHash
		})
	}
}

export default CreateUserUseCase