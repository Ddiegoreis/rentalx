import dayjs from "dayjs"

import RentalRepositoryInMemory from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory"
import CreateRentalUseCase from "./CreateRentalUseCase"
import DayjsDateProvider from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { AppError } from "@shared/errors/AppError"

let createRentalUseCase: CreateRentalUseCase
let rentalRepositoryInMemory: RentalRepositoryInMemory
let dayJsDateProvider: DayjsDateProvider

describe('Create rental', () => {
	const dayAdd24hours = dayjs().add(1, 'day').toDate()

	beforeEach(() => {
		rentalRepositoryInMemory = new RentalRepositoryInMemory()
		dayJsDateProvider = new DayjsDateProvider()
		createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory, dayJsDateProvider)
	})

	it('should be able to create a new rental', async () => {
		const rental = await createRentalUseCase.execute({
			user_id: '121231',
			car_id: '12331',
			expected_return_date: dayAdd24hours
		})

		expect(rental).toHaveProperty('id')
		expect(rental).toHaveProperty('start_date')
	})

	it('should not be able to create a new rental if there is another open to the same user', async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: '121231',
				car_id: '4444',
				expected_return_date: dayAdd24hours
			})

			await createRentalUseCase.execute({
				user_id: '121231',
				car_id: '777',
				expected_return_date: dayAdd24hours
			})
		}).rejects.toBeInstanceOf(AppError)
	})

	it('should not be able to create a new rental if there is another open to the same car', async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: '4321',
				car_id: '4444',
				expected_return_date: dayAdd24hours
			})

			await createRentalUseCase.execute({
				user_id: '7654',
				car_id: '4444',
				expected_return_date: dayAdd24hours
			})
		}).rejects.toBeInstanceOf(AppError)
	})

	it('should not be able to create a new rental if with invalid return time', async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: '4321',
				car_id: '4444',
				expected_return_date: dayjs().toDate()
			})
		}).rejects.toBeInstanceOf(AppError)
	})
})