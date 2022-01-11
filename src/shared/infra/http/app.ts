import express from 'express'
import swaggerUi from 'swagger-ui-express'
import 'express-async-errors'

import "reflect-metadata";
import '@shared/container'

import createConnection from '@shared/infra/typeorm'
import routes from '@shared/infra/http/routes';
import { errorKeeper } from '@shared/infra/http/middlewares/errorKeeper'
import swaggerFile from '../../../swagger.json'

createConnection()

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)

app.use(errorKeeper)

export { app }