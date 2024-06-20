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

  static identifyProjectParam = (
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const { idOrSlug } = req.params;

    // Expressão regular para validar UUID v4
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    const isId = uuidRegex.test(idOrSlug);

    req.isId = isId;

    next();
  }
}
