import { findUserByEmail } from '@controllers/users.controller'
import express from 'express'

const router = express.Router()

router.get('/users/:email', async (req: express.Request, res: express.Response) => {
  try {
    const email: string = req.params.email

    const data = await findUserByEmail(email)

    if (data.error) {
      res.status(400).send(data)
    } else {
      res.status(200).send(data)
    }
  } catch (error: any) {
    res.status(400).send({ result: null, error: 'Invalid User' })
  }
})

export default router
