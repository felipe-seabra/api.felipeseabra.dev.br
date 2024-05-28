import { newCompanySchema, updateCompanySchema } from './schema'

import { Response, NextFunction } from 'express'
import { IAuthRequest } from '../interfaces'
import { ValidationError } from 'joi'

export default class CompanyMiddleware {
  static validateNewCompany = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { body } = req
      await newCompanySchema.validateAsync(body)
      next()
    } catch (err) {
      console.error(err)
      if (err instanceof ValidationError) {
        return res
          .status(400)
          .send({ message: 'Some required fields are missing' })
      }
      return res.status(409).send({ message: 'Company already registered' })
    }
  }

  static validateUpdateCompany = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { body } = req
      await updateCompanySchema.validateAsync(body)
      next()
    } catch (err) {
      console.error(err)
      return res
        .status(400)
        .send({ message: 'Some required fields are missing' })
    }
  }
}
