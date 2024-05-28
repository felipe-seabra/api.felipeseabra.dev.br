import { Request, Response } from 'express'

import { mapError, errorMap } from '../utils/error-map'
import CompanyService from '../services/company-service'

export default class CompanyController {
  static createNewCompany = async (req: Request, res: Response) => {
    const { body } = req
    const { type, message } = await CompanyService.createNewCompany(body)

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })
    return res.status(201).json(message)
  }

  static findAllCompanys = async (_req: Request, res: Response) => {
    const { type, message } = await CompanyService.findAllCompanys()

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })

    return res.status(200).json(message)
  }

  static findCompanyById = async (req: Request, res: Response) => {
    const { id } = req.params
    const { type, message } = await CompanyService.findCompanyById(id)

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })

    return res.status(200).json(message)
  }

  static updateCompanyById = async (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req
    const { type, message } = await CompanyService.updateCompanyById(body, id)

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })

    return res.status(200).json(message)
  }

  static deleteCompanyById = async (req: Request, res: Response) => {
    const { id } = req.params
    const { type, message } = await CompanyService.deleteCompanyById(id)

    if (type)
      return res
        .status(mapError(type as keyof typeof errorMap))
        .json({ message })

    return res.status(200).json(message)
  }
}
