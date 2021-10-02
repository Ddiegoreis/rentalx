import { ICategoryRepository } from "../../repositories/ICategoryRepository"

interface IRequest {
  name: string
  description: string
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryALreadyExists = this.categoriesRepository.findByName(name)

    if (categoryALreadyExists)
      throw new Error('Category already exists')

    this.categoriesRepository.create({ name, description })
  }
}

export default CreateCategoryUseCase

