import express from 'express'

import Auth from '../middlewares/auth-middleware'
import SocialMiddleware from '../middlewares/social-middleware'
import SocialController from '../controllers/social-controller'

export const social = express.Router()

social.get('/', SocialController.findAllSocials)
social.get('/:id', SocialController.findSocialById)
social.post(
  '/',
  Auth.authToken,
  SocialMiddleware.validateNewSocial,
  SocialController.createNewSocial,
)
social.put(
  '/:id',
  Auth.authToken,
  SocialMiddleware.validateUpdateSocial,
  SocialController.updateSocialById,
)
social.delete('/:id', Auth.authToken, SocialController.deleteSocialById)
