import { inject, injectable } from "tsyringe"

import { ISpecificationRepository } from "../../repositories/ISpecificationRepository"

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationRepository) {}
  
  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists = this.specificationsRepository.findByName(name)

    if (specificationAlreadyExists)
      throw new Error('Specifications Already Exists')

    this.specificationsRepository.create({ name, description })
  }
}

export default CreateSpecificationUseCase