import fs from 'fs'
import csvParse from 'csv-parse'

import { ICategoryRepository } from '../../repositories/ICategoryRepository'

interface IImportCategory {
  name: string
  description: string
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}

  private loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, resject) => {
      const stream = fs.createReadStream(file.path)
      const categories: IImportCategory[] = []

      const parseFile = csvParse()

      stream.pipe(parseFile)

      parseFile.on('data', async (line) => {
        const [name, description] = line

        categories.push({ name, description })
      })
      .on('end', () => {
        resolve(categories)
      })
      .on('err', (err) => {
        resject(err)
      })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.map(async category => {
      const { name, description } = category

      const existCategory = this.categoriesRepository.findByName(name)

      if (!existCategory)
        this.categoriesRepository.create({
          name,
          description
        })
    })
  }
}


export default ImportCategoryUseCase