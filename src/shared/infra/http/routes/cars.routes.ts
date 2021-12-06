import { Router } from 'express'

import CreateCarControler from '@modules/cars/useCases/createCar/CreateCarController'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const carsRouter = Router()

const createCarController = new CreateCarControler()

carsRouter.post('/', ensureAuthenticate, ensureAdmin, createCarController.handle)

export default carsRouter