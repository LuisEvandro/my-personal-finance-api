// eslint-disable-next-line no-unused-vars
import { IUser } from '@models/users.model'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userDB = prisma.users

export const getUserByEmail = async (email: string) => {
  try {
    const result = await userDB.findUnique({
      where: {
        email
      }
    })

    return { result, error: null }
  } catch (error: any) {
    return { result: null, error }
  }
}

export const createCep = async (data: IUser) => {
  try {
    // TODO: encrypt pass {CODAR AINDA}

    const result = await userDB.create({
      data: {
        ...data
      }
    })

    return { result, error: null }
  } catch (error: any) {
    return { result: null, error }
  }
}
