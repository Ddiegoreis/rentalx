import { ISpecificationRepository } from "../../repositories/ISpecificationRepository"

interface IRequest {
  name: string
  description: string
}

class CreateSpecificationUseCase {
  private specificationsRepository: ISpecificationRepository
  
  constructor(specificationsRepository: ISpecificationRepository) {
    this.specificationsRepository = specificationsRepository
  }
  
  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists = this.specificationsRepository.findByName(name)

    if (specificationAlreadyExists)
      throw new Error('Specifications Already Exists')

    this.specificationsRepository.create({ name, description })
  }
}

export default CreateSpecificationUseCase