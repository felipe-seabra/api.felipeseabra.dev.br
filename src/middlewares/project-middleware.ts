import { newProjectSchema, updateProjectSchema } from './schema'

import { Response, NextFunction } from 'express'
import { IAuthRequest } from '../interfaces'
import { ValidationError } from 'joi'

export default class ProjectMiddleware {
  static validateNewProject = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { body } = req
      await newProjectSchema.validateAsync(body)
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
        .send({ message: 'Project entry already registered' })
    }
  }

  static validateUpdateProject = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { body } = req
      await updateProjectSchema.validateAsync(body)
      next()
    } catch (err) {
      console.error(err)
      return res
        .status(400)
        .send({ message: 'Some required fields are missing or invalid' })
    }
  }
}
