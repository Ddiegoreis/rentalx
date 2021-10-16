import CategoryRepository from "../../repositories/implementations/CategoryRepository";
import CreateCategoryController from "./CreateCategoryController";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

export default(): CreateCategoryController => {
  const categoriesRepository = new CategoryRepository()
  const createCategoriesUseCase = new CreateCategoryUseCase(categoriesRepository)
  const createCategoriesController = new CreateCategoryController(createCategoriesUseCase)

  return createCategoriesController
}
