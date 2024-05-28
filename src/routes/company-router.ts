import express from 'express'

import Auth from '../middlewares/auth-middleware'
import CompanyMiddleware from '../middlewares/company-middleware'
import CompanyController from '../controllers/company-controller'

export const company = express.Router()

company.get('/', CompanyController.findAllCompanys)
company.get('/:id', CompanyController.findCompanyById)
company.post(
  '/',
  Auth.authToken,
  CompanyMiddleware.validateNewCompany,
  CompanyController.createNewCompany,
)
company.put(
  '/:id',
  Auth.authToken,
  CompanyMiddleware.validateUpdateCompany,
  CompanyController.updateCompanyById,
)
company.delete('/:id', Auth.authToken, CompanyController.deleteCompanyById)
