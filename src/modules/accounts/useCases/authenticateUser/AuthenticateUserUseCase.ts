import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";

interface IRequest {
	email: string
	password: string
}

interface IResponse {
	user: {
		name: string,
		email: string
	},
	token: string
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository
	) { }

	async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.userRepository.findByEmail(email)

		if (!user)
			throw new AppError("Email or password incorrect")

		const passwordMatch = await compare(password, user.password)

		if (!passwordMatch)
			throw new AppError("Email or password incorrect")

		const token = sign({}, "a7e071b3de48cec1dd24de6cbe6c7bf1", {
			subject: user.id,
			expiresIn: "1d"
		})

		const tokenReturn: IResponse = {
			token,
			user: {
				name: user.name,
				email: user.email
			}
		}

		return tokenReturn
	}
}

export default AuthenticateUserUseCase