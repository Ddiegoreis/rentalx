import { ICategoryRepository } from "../repositories/ICategoryRepository"

interface IRequest {
  name: string
  description: string
}

class CreateCategoryService {
  private categoriesRepository: ICategoryRepository

  constructor(categoriesRepository: ICategoryRepository) {
    this.categoriesRepository = categoriesRepository
  }

  execute({ name, description }: IRequest): void {
    const categoryALreadyExists = this.categoriesRepository.findByName(name)

    if (categoryALreadyExists)
      throw new Error('Category already exists')

    this.categoriesRepository.create({ name, description })
  }
}

export default CreateCategoryService

