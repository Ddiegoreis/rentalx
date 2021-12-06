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

const server = express()

server.use(express.json())

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

server.use(routes)

server.use(errorKeeper)

server.listen(3333, () => console.log('Server is running'));

export default server