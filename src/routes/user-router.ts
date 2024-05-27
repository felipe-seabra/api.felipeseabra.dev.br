import express from 'express'

import Auth from '../middlewares/auth-middleware'
import UserMiddleware from '../middlewares/user-middleware'
import UserController from '../controllers/user-controller'

export const user = express.Router()

user.get('/', Auth.authToken, UserController.fildAllUsers)
user.get('/:id', Auth.authToken, UserController.findUserById)
user.post(
  '/',
  Auth.authToken,
  UserMiddleware.validateNewUser,
  UserController.createNewUser,
)
user.put(
  '/:id',
  Auth.authToken,
  UserMiddleware.validateUpdateUser,
  UserController.updateUserById,
)
user.delete('/:id', Auth.authToken, UserController.deleteUserById)
