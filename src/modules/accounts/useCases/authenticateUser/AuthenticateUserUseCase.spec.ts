import { AppError } from "@errors/AppError"
import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO"
import UserRepositoryInMemory from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory"
import CreateUserUseCase from "@modules/accounts/useCases/createUser/CreateUserUseCase"
import AuthenticateUserUseCase from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let userRepositoryInMemory: UserRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
	beforeEach(() => {
		userRepositoryInMemory = new UserRepositoryInMemory()
		authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory)
		createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
	})

	it("should be able to authenticate an user", async () => {
		const user: ICreateUserDTO = {
			driver_license: '999999',
			email: 'user@teste.com',
			name: 'Test User',
			password: '123'
		}

		await createUserUseCase.execute(user)

		const authResult = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password
		})

		expect(authResult).toHaveProperty("token")
	})

	it("should be able to authenticate an nonexistent user", () => {
		expect(async () => {
			await authenticateUserUseCase.execute({
				email: "false@test.com",
				password: "123"
			})
		}).rejects.toBeInstanceOf(AppError)
	})

	it("should not be able to authenticate with incorrect password", () => {
		expect(async () => {
			const user: ICreateUserDTO = {
				driver_license: '999999',
				email: 'user@teste.com',
				name: 'Test User',
				password: '123'
			}

			await createUserUseCase.execute(user)

			await authenticateUserUseCase.execute({
				email: user.email,
				password: "1234"
			})
		}).rejects.toBeInstanceOf(AppError)
	})
})