import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import CreateCarControler from '@modules/cars/useCases/createCar/CreateCarController'
import ListAvailableCarsController from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import CreateCarSpecificationController from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import UploadCarImageController from '@modules/cars/useCases/uploadCarImage/UploadCarImageController'

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const carsRoutes = Router()

const uploadCarImages = multer(uploadConfig.upload('./tmp/carImages'))

const createCarController = new CreateCarControler()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()

carsRoutes.get('/available', listAvailableCarsController.handle)

carsRoutes.post(
	'/',
	ensureAuthenticate,
	ensureAdmin,
	createCarController.handle
)

carsRoutes.post(
	'/specifications/:id',
	ensureAuthenticate,
	ensureAdmin,
	createCarSpecificationController.handle
)

carsRoutes.post(
	'/images/:id',
	ensureAuthenticate,
	ensureAdmin,
	uploadCarImages.array('images'),
	uploadCarImageController.handle
)

export default carsRoutes