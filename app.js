import { apiReference } from '@scalar/express-api-reference'
import serveSwaggerSpecification from './src/config/openapi.js'
import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './src/routes/userRoutes.js'

const app = express()
const port = 3000

app.use(bodyParser.json());

app.use("/api/v1/users", userRoutes);


app.use(
  '/reference',
  apiReference({
    theme: 'laserwave',
    url: '/openapi.json',
  }),
)

app.get('/openapi.json', serveSwaggerSpecification);

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
