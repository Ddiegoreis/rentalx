import { Router } from 'express'

import CreateCarControler from '@modules/cars/useCases/createCar/CreateCarController'

const carsRouter = Router()

const createCarController = new CreateCarControler()

carsRouter.post('/', createCarController.handle)

export default carsRouter