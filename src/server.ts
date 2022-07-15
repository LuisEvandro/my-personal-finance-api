import cors from 'cors'
import express from 'express'
import routes from './routes/routes'
require('dotenv').config()

const PORT = process.env.PORT || 3333

const app = express()

app.use([
  express.json(),
  cors(),
  routes
])

app.get('/', (req: express.Request, resp: express.Response) => resp.json({ message: 'API IS WORKING 🚀' }))

app.listen(PORT, () => {
  console.log('Server is listenning on port ', PORT)
})
