import { Request, Response } from 'express'
import { LoginSchema, RegisterSchema } from '../../schemas/UserSchema'
import { StatusCodes } from 'http-status-codes'
import { CONFIG } from '../../config'
import { comparePassword, generateAccesToken, hashPassword, logActivity, ResponseData, validateInput } from '../../utils'
import prisma from '../../config/database'
import logger from '../../utils/log'

const AuthController = {
  register : async (req: Request, res: Response) => {
    const reqBody = req.body
      
    const validationResult = validateInput(RegisterSchema, reqBody)
      
    if (!validationResult.success) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          ResponseData(
            StatusCodes.BAD_REQUEST,
            'Invalid Input',
            validationResult.errors,
          ),
        )
    }
    try {

      const cekExistingRole = await prisma.role.findUnique({
        where: { id: reqBody.roleId },
      })

      if (!cekExistingRole) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(
            ResponseData(
              StatusCodes.BAD_REQUEST,
              'Role not found',
            ),
          )
      }
      
      reqBody.password = await hashPassword(reqBody.password)

      const userData = await prisma.user.create({
        data: {
          name: reqBody.name,
          email: reqBody.email,
          password: reqBody.password,
          roleId: cekExistingRole.id,
        },
      })

      return res
        .status(StatusCodes.CREATED)
        .json(ResponseData(StatusCodes.CREATED, 'Success', userData))
    } catch (error: any) {
      logger.error(error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          ResponseData(
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Internal server error' + error.message,
          ),
        )
    }
  },
  login : async (req: Request, res: Response) => {
    const reqBody = req.body

    const validationResult = validateInput(LoginSchema, reqBody)

    if (!validationResult.success) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          ResponseData(
            StatusCodes.BAD_REQUEST,
            'Invalid Input',
            validationResult.errors,
          ),
        )
    }

    try {
      const userData = await prisma.user.findUnique(
        {
          where: {
            email: reqBody.email,
          },
          include : { role : true },
        },
      )

      if (!userData) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(ResponseData(StatusCodes.NOT_FOUND, 'User not found'))
      }

      const passwordMatch = await comparePassword(reqBody.password, userData.password as string)

      if (!passwordMatch) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(ResponseData(StatusCodes.UNAUTHORIZED, 'Password not match'))
      }
      const tokenPayload = {
        id: userData.id,
        name: userData.name as string,
        role: userData.role.name,
      }

      const token = generateAccesToken(tokenPayload, CONFIG.secret.jwtSecret, 3600 * 24) // 1 day

      await prisma.session.create({
        data: {
          token: token,
          userId: userData.id,
        },
      })

      await logActivity(userData.id, 'login', 'User login')

      const responseData = {
        ...userData,
        token,
      }

      return res
        .status(StatusCodes.OK)
        .json(ResponseData(StatusCodes.OK, 'Success', responseData))

    } catch (error : any) {
      logger.error(error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          ResponseData(
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Internal server error' + error.message,
          ))
    }
  },
  
  logout : async (req: Request, res: Response) => {
    const userLogin = req.user as any

    try {
      await prisma.session.deleteMany({
        where: {
          userId: userLogin.id,
        },
      })

      await logActivity(userLogin.id, 'logout', 'User logout')

      return res
        .status(StatusCodes.OK)
        .json(ResponseData(StatusCodes.OK, 'Success'))

    } catch (error : any) {
      logger.error(error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          ResponseData(
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Internal server error' + error.message,
          ),
        )
    }
  },

}


export default AuthController