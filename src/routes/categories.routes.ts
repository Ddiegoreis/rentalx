import { Router } from 'express'

import CategoryRepository from '../repositories/CategoryRepository'

const categoriesRoutes = Router()
const categoriesRepository = new CategoryRepository()

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  const categoryALreadyExists = categoriesRepository.findByName(name)

  if (categoryALreadyExists)
    return response.status(400).json({ error: 'Category already exists' })

  categoriesRepository.create({ name, description })

  return response.status(201).send()
})

categoriesRoutes.get('/', (request, response) => {
  const all = categoriesRepository.list()

  return response.json(all)
})

export default categoriesRoutes