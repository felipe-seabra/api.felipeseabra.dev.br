import { Request, Response } from 'express'

import { mapError, errorMap } from '../utils/error-map'
import SocialService from '../services/social-service'

export default class SocialController {
  static createNewSocial = async (req: Request, res: Response) => {
    const { body } = req
    const { type, message } = await SocialService.createNewSocial(body)

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })
    return res.status(201).json(message)
  }

  static findAllSocials = async (req: Request, res: Response) => {
    const { type, message } = await SocialService.findAllSocials()

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })

    return res.status(200).json(message)
  }

  static findSocialById = async (req: Request, res: Response) => {
    const { id } = req.params
    const { type, message } = await SocialService.findSocialById(id)

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })

    return res.status(200).json(message)
  }

  static updateSocialById = async (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req
    const { type, message } = await SocialService.updateSocialById(body, id)

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })

    return res.status(200).json(message)
  }

  static deleteSocialById = async (req: Request, res: Response) => {
    const { id } = req.params
    const { type, message } = await SocialService.deleteSocialById(id)

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })

    return res.status(200).json(message)
  }
}
