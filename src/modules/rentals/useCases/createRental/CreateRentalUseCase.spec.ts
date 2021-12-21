import RentalRepositoryInMemory from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import CreateRentalUseCase from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase
let rentalRepositoryInMemory: RentalRepositoryInMemory

describe('Create rental', () => {
	beforeEach(() => {
		rentalRepositoryInMemory = new RentalRepositoryInMemory()
		createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory)
	})

	it('should be able to create a new rental', async () => {
		const rental = await createRentalUseCase.execute({
			user_id: '121231',
			car_id: '12331',
			expected_return_date: new Date()
		})

		expect(rental).toHaveProperty('id')
		expect(rental).toHaveProperty('start_date')
	})

	it('should not be able to create a new rental if there is another open to the same user', async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: '121231',
				car_id: '4444',
				expected_return_date: new Date()
			})

			await createRentalUseCase.execute({
				user_id: '121231',
				car_id: '777',
				expected_return_date: new Date()
			})
		}).rejects.toBeInstanceOf(AppError)
	})

	it('should not be able to create a new rental if there is another open to the same car', async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: '4321',
				car_id: '4444',
				expected_return_date: new Date()
			})

			await createRentalUseCase.execute({
				user_id: '7654',
				car_id: '4444',
				expected_return_date: new Date()
			})
		}).rejects.toBeInstanceOf(AppError)
	})
})