import CarsRepositoryInMemmory from "@modules/cars/repositories/in-memory/CarsRepostiroyInMemory"
import CreateSpecificationsRepositoryInMemory from "@modules/cars/repositories/in-memory/CreateSpecificationsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import CreateCarSpecificationUseCase from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemmory
let createSpecificationsRepositoryInMemory: CreateSpecificationsRepositoryInMemory

describe('create car specification', () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemmory()
		createSpecificationsRepositoryInMemory = new CreateSpecificationsRepositoryInMemory()
		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, createSpecificationsRepositoryInMemory)
	})

	it('should not be able to add a new specification to a non-existent car', async () => {
		expect(async () => {
			const car_id = '12345'
			const specifications_id = ['54321']

			await createCarSpecificationUseCase.execute({ car_id, specifications_id })
		}).rejects.toBeInstanceOf(AppError)
	})

	it('should be able to add a new specification to a car', async () => {
		const car = await carsRepositoryInMemory.create({
			brand: 'Brand',
			category_id: 'category',
			daily_rate: 100,
			description: 'Description Car',
			fine_amount: 60,
			license_plate: 'AB',
			name: 'Name Car'
		})

		const specification = await createSpecificationsRepositoryInMemory.create({
			description: 'Test',
			name: 'Test'
		})

		const specifications_id = [specification.id]

		const specificationsCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id })

		expect(specificationsCars).toHaveProperty('specifications')
		expect(specificationsCars.specifications.length).toBe(1)
	})
})