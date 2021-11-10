import Category from "@modules/cars/entities/Category";
import { ICategoryRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoryRepository";

class CategoriesRepositoryInMemory implements ICategoryRepository {
	categories: Category[] = []

	async findByName(nome: string): Promise<Category> {
		const category = this.categories.find(category => category.name === nome)

		return category
	}

	async list(): Promise<Category[]> {
		const all = this.categories

		return all
	}

	async create({ name, description }: ICreateCategoryDTO): Promise<void> {
		const category = new Category()

		Object.assign(category, {
			name,
			description
		})

		this.categories.push(category)
	}
}

export default CategoriesRepositoryInMemory