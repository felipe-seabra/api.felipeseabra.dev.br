import express from 'express'

import Auth from '../middlewares/auth-middleware'
import CompanyMiddleware from '../middlewares/company-middleware'
import CompanyController from '../controllers/company-controller'

export const company = express.Router()

company.get('/', Auth.authToken, CompanyController.findAllCompanys)
company.get('/:id', Auth.authToken, CompanyController.findCompanyById)
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
