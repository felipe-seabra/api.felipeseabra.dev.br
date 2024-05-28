import { prismaClient } from '../database'

import { ICompany } from '../interfaces'

export default class CompanyService {
  static createNewCompany = async (company: ICompany) => {
    try {
      await prismaClient.company.create({
        data: { ...company },
      })

      return { type: null, message: 'Company created successfully' }
    } catch (err) {
      console.log(err)
      return {
        type: 'COMPANY_ALREADY_REGISTERED',
        message: 'Company already registered',
      }
    }
  }

  static findAllCompanys = async () => {
    const companys = await prismaClient.company.findMany()
    if (companys.length === 0) {
      return { type: 'COMPANY_NOT_FOUND', message: 'No company found' }
    }

    return { type: null, message: companys }
  }

  static findCompanyById = async (id: string) => {
    try {
      const company = await prismaClient.company.findUnique({
        where: { id },
      })

      return { type: null, message: company }
    } catch (err) {
      return { type: 'COMPANY_NOT_FOUND', message: 'Company does not exists' }
    }
  }

  static updateCompanyById = async (company: ICompany, id: string) => {
    try {
      await prismaClient.company.update({
        where: { id },
        data: { ...company },
      })

      return { type: null, message: 'Company updated successfully' }
    } catch (err) {
      return { type: 'COMPANY_NOT_FOUND', message: 'Company does not exists' }
    }
  }

  static deleteCompanyById = async (id: string) => {
    try {
      await prismaClient.company.delete({
        where: { id },
      })

      return { type: null, message: 'Company successfully deleted' }
    } catch (err) {
      return { type: 'COMPANY_NOT_FOUND', message: 'Company does not exists' }
    }
  }
}
