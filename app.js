import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './src/routes/userRoutes.js'

const app = express()
const port = 3000

app.use(bodyParser.json());

app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
