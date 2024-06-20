import { Request, Response } from 'express'

import { mapError, errorMap } from '../utils/error-map'
import ProjectService from '../services/project-service'

export default class ProjectController {
  static createNewProject = async (req: Request, res: Response) => {
    const { body } = req
    const { type, message } = await ProjectService.createNewProject(body)

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })
    return res.status(201).json(message)
  }

  static findAllProjects = async (req: Request, res: Response) => {
    const { type, message } = await ProjectService.findAllProjects()

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })

    return res.status(200).json(message)
  }

  static findProjectById = async (req: Request, res: Response) => {
    const { idOrSlug } = req.params
    const { type, message } = await ProjectService.findProjectById(idOrSlug)

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })

    return res.status(200).json(message)
  }

  static findProjectBySlug = async (req: Request, res: Response) => {
    const { idOrSlug } = req.params
    const { type, message } = await ProjectService.findProjectBySlug(idOrSlug)

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })

    return res.status(200).json(message)
  }

  static updateProjectById = async (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req
    const { type, message } = await ProjectService.updateProjectById(body, id)

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })

    return res.status(200).json(message)
  }

  static deleteProjectById = async (req: Request, res: Response) => {
    const { id } = req.params
    const { type, message } = await ProjectService.deleteProjectById(id)

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })
  }
}
