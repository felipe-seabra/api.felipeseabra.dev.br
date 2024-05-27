import { Request, Response } from 'express'

import { mapError, errorMap } from '../utils/error-map'
import { IAuthRequest } from '../interfaces'

import UserService from '../services/user-service'

export default class UserController {
  static fildAllUsers = async (_req: Request, res: Response) => {
    const { type, message } = await UserService.fildAllUsers()
    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })

    res.status(200).json(message)
  }

  static findUserById = async (_req: Request, res: Response) => {
    const { id } = _req.params
    const { type, message } = await UserService.findUserById(id)

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })

    res.status(200).json(message)
  }

  static createNewUser = async (req: IAuthRequest, res: Response) => {
    const { body } = req
    const { type, message } = await UserService.createNewUser(body)

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })

    res.status(201).json(message)
  }

  static updateUserById = async (req: IAuthRequest, res: Response) => {
    const { id } = req.params
    const { body } = req

    const { type, message } = await UserService.updateUserById(body, id)

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })

    res.status(201).json(message)
  }

  static deleteUserById = async (req: IAuthRequest, res: Response) => {
    const { id } = req.params
    const { type, message } = await UserService.deleteUserById(id)

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })

    res.status(204).json(message)
  }
}
