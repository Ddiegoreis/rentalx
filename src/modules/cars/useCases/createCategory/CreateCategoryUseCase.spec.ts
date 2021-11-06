
import { AppError } from "../../../../errors/AppError"
import CategoriesRepositoryInMemory from "../../repositories/in-memory/CategoriesRepositoryInMemory"
import CreateCategoryUseCase from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe("Create category", () => {
	beforeEach(() => {
		categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
		createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
	})

	it("should be able a new category", async () => {
		const category = {
			name: "Category Test",
			description: "Description Test"
		}

		await createCategoryUseCase.execute(category)

		const categoryCreate = await categoriesRepositoryInMemory.findByName(category.name)

		expect(categoryCreate).toHaveProperty("id")
	})

	it("should not be able a new category with name exists", async () => {
		expect(async () => {
			const category = {
				name: "Category Test",
				description: "Description Test"
			}

			await createCategoryUseCase.execute(category)

			await createCategoryUseCase.execute(category)
		}).rejects.toBeInstanceOf(AppError)
	})
})