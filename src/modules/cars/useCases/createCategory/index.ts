import CategoryRepository from "../../repositories/implementations/CategoryRepository";
import CreateCategoryController from "./CreateCategoryController";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

const categoriesRepository = CategoryRepository.getInstance()
const createCategoriesUseCase = new CreateCategoryUseCase(categoriesRepository)
const createCategoriesController = new CreateCategoryController(createCategoriesUseCase)

export { createCategoriesController }