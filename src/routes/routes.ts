import { Router } from 'express'
import userController from '@controllers/users.controller'

const apiRoutes = Router().use(userController)

export default Router().use('/api', apiRoutes)
