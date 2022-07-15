// eslint-disable-next-line no-unused-vars
import { IUser, IUserBody, IUserToken } from '@models/users.model'
import { PrismaClient } from '@prisma/client'
import { generateGuidToken } from 'src/utils/functions'

const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const userDB = prisma.users

const userTokenDB = prisma.usersToken

export const getUserByEmail = async (email: string) => {
  try {
    const result = await userDB.findUnique({
      where: {
        email
      }
    })

    return result
  } catch (error: any) {
    return error
  }
}

export const createUser = async (body: IUserBody) => {
  try {
    body.password = await bcrypt.hash(body.password, 12)

    const result = await userDB.create({
      data: {
        ...body
      }
    })

    return result
  } catch (error: any) {
    return error
  }
}

export const updateUser = async (email: string, body: any) => {
  try {
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 12)
    }

    const result = await userDB.update({
      data: {
        ...body
      },
      where: {
        email
      }
    })

    return result
  } catch (error: any) {
    return error
  }
}

export const generateGuidTokenLogin = async (user: IUser) => {
  try {
    const guidToken = generateGuidToken()

    const result = await userTokenDB.create({
      data: {
        token: guidToken,
        userId: user.id
      }
    })

    return result
  } catch (error: any) {
    return error
  }
}

export const deleteGuidTokenLogin = async (userId: number) => {
  try {
    const tokenData = await userTokenDB.findFirst({
      where: {
        userId: userId
      }
    })

    if (tokenData.id) {
      await userTokenDB.delete({
        where: {
          id: tokenData.id
        }
      })
    }

    return true
  } catch (error: any) {
    return error
  }
}

export const getGuidTokenLogin = async (guidToken: string) => {
  try {
    const tokenData = await userTokenDB.findFirst({
      where: {
        token: guidToken
      }
    })

    return tokenData
  } catch (error: any) {
    return error
  }
}
