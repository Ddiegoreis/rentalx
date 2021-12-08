import { Router } from 'express'

import CreateCarControler from '@modules/cars/useCases/createCar/CreateCarController'
import ListAvailableCarsController from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const carsRouter = Router()

const createCarController = new CreateCarControler()
const listAvailableCarsController = new ListAvailableCarsController()

carsRouter.post('/', ensureAuthenticate, ensureAdmin, createCarController.handle)
carsRouter.get('/available', listAvailableCarsController.handle)

export default carsRouter