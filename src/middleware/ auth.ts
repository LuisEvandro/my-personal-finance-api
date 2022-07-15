/* eslint-disable no-throw-literal */
/* eslint-disable no-unused-vars */
import { IUserToken } from '@models/users.model'
import { NextFunction, Request, Response } from 'express'
import { deleteGuidTokenLogin, getGuidTokenLogin } from 'src/services/users.service'

module.exports = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminGuidToken = process.env.ADMIN_GUID_TOKEN
    const guidToken = req.headers.authorization

    if (!guidToken) {
      return res.status(403).json({ result: null, error: 'Required token auth' })
    }

    if (guidToken === adminGuidToken) {
      return next()
    }

    const guidTokenData: IUserToken = await getGuidTokenLogin(guidToken)
    const dateNow = new Date()
    const dateGuidToken = new Date(guidTokenData.createdAt.toISOString())

    var dateLimit: any = new Date(dateGuidToken)
    dateLimit = dateLimit.setHours(dateLimit.getHours() + 8)

    if (dateNow > dateLimit) {
      await deleteGuidTokenLogin(guidTokenData.userId)
      return res.status(403).json({ result: null, error: 'Invalid Token' })
    } else {
      next()
    }
  } catch (error: any) {
    res.status(401).json({ result: null, error })
  }
}
