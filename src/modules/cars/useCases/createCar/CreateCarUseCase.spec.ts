import CarsRepositoryInMemmory from "@modules/cars/repositories/in-memory/CarsRepostiroyInMemory"
import { AppError } from "@shared/errors/AppError"
import CreateCarUseCase from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepository: CarsRepositoryInMemmory

describe('Create car', () => {
	beforeEach(() => {
		carsRepository = new CarsRepositoryInMemmory()
		createCarUseCase = new CreateCarUseCase(carsRepository)
	})

	it('Should be able to create a new car', async () => {
		const car = await createCarUseCase.execute({
			brand: 'Brand',
			category_id: 'category',
			daily_rate: 100,
			description: 'Description Car',
			fine_amount: 60,
			license_plate: 'AB',
			name: 'Name Car'
		})

		expect(car).toHaveProperty('id')
	})

	it('Should not be able to create a car with exists license plate', () => {
		expect(async () => {
			await createCarUseCase.execute({
				brand: 'Brand',
				category_id: 'category',
				daily_rate: 100,
				description: 'Description Car',
				fine_amount: 60,
				license_plate: 'AB',
				name: 'Name Car 1'
			})

			await createCarUseCase.execute({
				brand: 'Brand',
				category_id: 'category',
				daily_rate: 100,
				description: 'Description Car',
				fine_amount: 60,
				license_plate: 'AB',
				name: 'Name Car 2'
			})
		}).rejects.toBeInstanceOf(AppError)
	})

	it('Should not be able to create a car with available true by default', async () => {
		const car = await createCarUseCase.execute({
			brand: 'Car',
			category_id: 'category',
			daily_rate: 100,
			description: 'Description Car',
			fine_amount: 60,
			license_plate: 'ABC-123',
			name: 'available'
		})

		expect(car.available).toBe(true)
	})
})