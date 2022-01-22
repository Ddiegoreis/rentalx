import Router from 'express'

import CreateRentalController from '@modules/rentals/useCases/createRental/CreateRentalController'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'
import DevolutionRentalController from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController'

const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()

rentalRoutes.post('/', ensureAuthenticate, createRentalController.handle)
rentalRoutes.post('/devolution/:id', ensureAuthenticate, devolutionRentalController.handle)

export default rentalRoutes