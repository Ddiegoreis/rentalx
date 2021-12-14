import { Router } from 'express'

import CreateCarControler from '@modules/cars/useCases/createCar/CreateCarController'
import ListAvailableCarsController from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import CreateCarSpecificationController from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const carsRouter = Router()

const createCarController = new CreateCarControler()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()

carsRouter.get('/available', listAvailableCarsController.handle)
carsRouter.post('/', ensureAuthenticate, ensureAdmin, createCarController.handle)
carsRouter.post('/specifications/:id', ensureAuthenticate, ensureAdmin, createCarSpecificationController.handle)

export default carsRouter