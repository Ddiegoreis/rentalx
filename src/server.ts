import express from 'express'
import swaggerUi from 'swagger-ui-express'
import 'express-async-errors'

import './database'
import '@shared/container'

import routes from './routes';
import swaggerFile from './swagger.json'
import { errorKeeper } from '@middlewares/errorKeeper'

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)

app.use(errorKeeper)

app.listen(3333, () => console.log('Server is running'));
