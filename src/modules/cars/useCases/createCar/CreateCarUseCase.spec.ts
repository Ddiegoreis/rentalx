import CarsRepositoryInMemmory from "@modules/cars/repositories/in-memory/CarsRepostiroyInMemory"
import CreateCarUseCase from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepository: CarsRepositoryInMemmory

describe('Create car', () => {
	beforeEach(() => {
		carsRepository = new CarsRepositoryInMemmory()
		createCarUseCase = new CreateCarUseCase(carsRepository)
	})

	it('Should be able to create a new car', async () => {
		await createCarUseCase.execute({
			brand: 'Brand',
			category_id: 'category',
			daily_rate: 100,
			description: 'Description Car',
			fine_amount: 60,
			license_plate: 'AB',
			name: 'Name Car'
		})
	})
})