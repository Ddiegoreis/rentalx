import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

interface IRequest {
	name: string;

	description: string;
}

@injectable()
class CreateCategoryUseCase {
	constructor(
		@inject("CategoryRepository")
		private categoriesRepository: ICategoryRepository
	) { }

	async execute({ name, description }: IRequest): Promise<void> {
		const categoryALreadyExists = await this.categoriesRepository.findByName(
			name
		);

		if (categoryALreadyExists) throw new AppError("Category already exists");

		this.categoriesRepository.create({ name, description });
	}
}

export default CreateCategoryUseCase;
