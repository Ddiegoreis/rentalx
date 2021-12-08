import CarsRepositoryInMemmory from "@modules/cars/repositories/in-memory/CarsRepostiroyInMemory"
import ListCarsUseCase from "./ListAvailableCarsUseCase"

let listCarsUseCase: ListCarsUseCase
let carRepositoryInMemory: CarsRepositoryInMemmory

describe('List cars', () => {
	beforeEach(() => {
		carRepositoryInMemory = new CarsRepositoryInMemmory()
		listCarsUseCase = new ListCarsUseCase(carRepositoryInMemory)
	})

	it('should to be list all available cars', async () => {
		const car = await carRepositoryInMemory.create({
			brand: "Brand",
			daily_rate: 100,
			description: "Description Car",
			fine_amount: 60,
			license_plate: "ABCD",
			name: "Audi",
			category_id: "6a45d50d-c282-41db-b671-cc187f1728c1"
		})

		const cars = await listCarsUseCase.execute({})

		expect(cars).toEqual([car])
	})

	it('should be able to list all available cars by name', async () => {
		const car = await carRepositoryInMemory.create({
			brand: "Brand",
			daily_rate: 100,
			description: "Description Car",
			fine_amount: 60,
			license_plate: "ABCD",
			name: "Porsche",
			category_id: "6a45d50d-c282-41db-b671-cc187f1728c1"
		})

		const cars = await listCarsUseCase.execute({
			name: "Porsche"
		})

		expect(cars).toEqual([car])
	})

	it('should be able to list all available cars by brand', async () => {
		const car = await carRepositoryInMemory.create({
			brand: "GOL",
			daily_rate: 100,
			description: "Description Car",
			fine_amount: 60,
			license_plate: "ABCDE",
			name: "GOL",
			category_id: "6a45d50d-c282-41db-b671-cc187f1728c1"
		})

		const cars = await listCarsUseCase.execute({
			brand: "GOL"
		})
	})

	it('should be able to list all available cars by category id', async () => {
		const car = await carRepositoryInMemory.create({
			brand: "GOLF",
			daily_rate: 100,
			description: "Description Car",
			fine_amount: 60,
			license_plate: "ABCDE",
			name: "GOLF",
			category_id: "12345"
		})

		const cars = await listCarsUseCase.execute({
			category_id: "12345"
		})

		expect(cars).toEqual([car])
	})
})