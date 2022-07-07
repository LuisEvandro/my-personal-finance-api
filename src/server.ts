import cors from 'cors'
import express from 'express'
import routes from './routes'
require('dotenv').config()

const PORT = process.env.PORT || 3333

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req: express.Request, resp: express.Response) => resp.json({ message: 'API IS WORKING 🚀' }))

app.use('/api', routes)

app.listen(PORT, () => {
  console.log('Server is listenning on port ', PORT)
})
