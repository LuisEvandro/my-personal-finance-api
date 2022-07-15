// eslint-disable-next-line no-unused-vars
import { IUser } from '@models/users.model'
import express from 'express'
import { createUser, deleteGuidTokenLogin, generateGuidTokenLogin, getUserByEmail, updateUser } from 'src/services/users.service'
const auth = require('../middleware/ auth')
const bcrypt = require('bcryptjs')

const router = express.Router()

router.get('/user/:email', auth, async (req: express.Request, res: express.Response) => {
  try {
    const email: string = req.params.email

    const result: IUser = await getUserByEmail(email)

    delete result.password

    return res.status(200).json({ result, error: null })
  } catch (error: any) {
    return res.status(400).json({ result: null, error })
  }
})

router.post('/user/create', async (req: express.Request, res: express.Response) => {
  try {
    const body = req.body

    if (!body.email || !body.name || !body.password) {
      return res.status(422).json({ result: null, error: 'Missing body param' })
    }

    const isExisting: IUser = await getUserByEmail(body.email)

    if (isExisting) {
      return res.status(200).json({ result: null, error: 'This email already exists !' })
    }

    const result = await createUser(body)

    delete result.password

    return res.status(200).json({ result, error: null })
  } catch (error: any) {
    return res.status(400).json({ result: null, error })
  }
})

router.put('/user/update/:email', auth, async (req: express.Request, res: express.Response) => {
  try {
    const email: string = req.params.email
    const body = req.body

    if (!body.name) {
      return res.status(422).json({ result: null, error: 'Missing body param' })
    }

    const result = await updateUser(email, body)

    return res.status(200).json({ result, error: null })
  } catch (error: any) {
    return res.status(400).json({ result: null, error })
  }
})

router.post('/user/login', async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(422).json({ result: null, error: 'Missing body param' })
    }

    const isExisting: IUser = await getUserByEmail(email)

    if (!isExisting) {
      return res.status(200).json({ result: null, error: 'User does not exist !' })
    }

    const passwordCheck = await bcrypt.compare(password, isExisting.password)

    if (!passwordCheck) {
      return res.status(403).json({ result: null, error: 'Incorrect password' })
    }

    await deleteGuidTokenLogin(isExisting.id)
    const authGuidToken = await generateGuidTokenLogin(isExisting)

    delete isExisting.id
    delete isExisting.password
    delete isExisting.createdAt

    return res.status(200).json({ result: { ...isExisting, authGuidToken }, error: null })
  } catch (error: any) {
    return res.status(400).json({ result: null, error })
  }
})

router.post('/user/logout', async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body

    const isExisting: IUser = await getUserByEmail(email)

    if (!isExisting) {
      return res.status(200).json({ result: null, error: 'User does not exist !' })
    }

    const result = await deleteGuidTokenLogin(isExisting.id)

    return res.status(200).json({ result, error: null })
  } catch (error: any) {
    return res.status(400).json({ result: null, error })
  }
})

export default router
