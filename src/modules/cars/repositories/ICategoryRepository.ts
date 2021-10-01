import Category from "../models/Category";

interface ICreateCategoryDTO {
  name: string
  description: string
}

interface ICategoryRepository {
  findByName(nome: string): Category
  list(): Category[]
  create({ name, description }: ICreateCategoryDTO): void
}

export { ICategoryRepository,  ICreateCategoryDTO }