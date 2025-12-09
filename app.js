import { apiReference } from '@scalar/express-api-reference'
import serveSwaggerSpecification from './src/config/openapi.js'
import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './src/routes/userRoutes.js'
import announcementRoutes from './src/routes/announcementRoutes.js'
import personsRoutes from './src/routes/personsRoutes.js';


const app = express()
const port = 3000

app.use(bodyParser.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/announcements", announcementRoutes);
app.use('/api/v1/persons', personsRoutes);

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

