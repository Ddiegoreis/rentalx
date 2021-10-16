import Category from "../entities/Category";

interface ICreateCategoryDTO {
  name: string
  description: string
}

interface ICategoryRepository {
  findByName(nome: string): Promise<Category>
  list(): Promise<Category[]>
  create({ name, description }: ICreateCategoryDTO): Promise<void>
}

export { ICategoryRepository,  ICreateCategoryDTO }