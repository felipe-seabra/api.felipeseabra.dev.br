import express, { Response } from 'express'

import { IAuthRequest } from '../interfaces'

import Auth from '../middlewares/auth-middleware'
import ProjectMiddleware from '../middlewares/project-middleware'
import ProjectController from '../controllers/project-controller'

export const project = express.Router()

project.get('/', ProjectController.findAllProjects)

project.get('/:idOrSlug', ProjectMiddleware.identifyProjectParam, (req: IAuthRequest, res: Response) => {
  if (req.isId) {
    ProjectController.findProjectById(req, res);
  } else {
    ProjectController.findProjectBySlug(req, res);
  }
})

project.post(
  '/',
  Auth.authToken,
  ProjectMiddleware.validateNewProject,
  ProjectController.createNewProject,
)
project.put(
  '/:id',
  Auth.authToken,
  ProjectMiddleware.validateUpdateProject,
  ProjectController.updateProjectById,
)
project.delete('/:id', Auth.authToken, ProjectController.deleteProjectById)
