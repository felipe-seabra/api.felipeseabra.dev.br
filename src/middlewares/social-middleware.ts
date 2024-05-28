import { newSocialSchema, updateSocialSchema } from './schema'

import { Response, NextFunction } from 'express'
import { IAuthRequest } from '../interfaces'
import { ValidationError } from 'joi'

export default class SocialMiddleware {
  static validateNewSocial = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { body } = req
      await newSocialSchema.validateAsync(body)
      next()
    } catch (err) {
      console.error(err)
      if (err instanceof ValidationError) {
        return res
          .status(400)
          .send({ message: 'Some required fields are missing or invalid' })
      }
      return res
        .status(409)
        .send({ message: 'Social entry already registered' })
    }
  }

  static validateUpdateSocial = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { body } = req
      await updateSocialSchema.validateAsync(body)
      next()
    } catch (err) {
      console.error(err)
      return res
        .status(400)
        .send({ message: 'Some required fields are missing or invalid' })
    }
  }
}
