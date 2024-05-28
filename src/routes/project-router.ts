import express from 'express'

import Auth from '../middlewares/auth-middleware'
import ProjectMiddleware from '../middlewares/project-middleware'
import ProjectController from '../controllers/project-controller'

export const project = express.Router()

project.get('/', ProjectController.findAllProjects)
project.get('/:id', ProjectController.findProjectById)
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
