import express from 'express'

import LoginController from '../controllers/login-controller'

export const login = express.Router()

login.post('/', LoginController.login)
