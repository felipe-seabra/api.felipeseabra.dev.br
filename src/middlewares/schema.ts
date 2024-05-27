import Joi from 'joi'

const validRoles = ['MASTER', 'ADMIN', 'USER']

export const newUserSchema = Joi.object({
  name: Joi.string().min(8).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
  active: Joi.boolean().required(),
  role: Joi.string()
    .valid(...validRoles)
    .required(),
})

export const updateUserSchema = Joi.object({
  name: Joi.string().min(8),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(6),
  active: Joi.boolean(),
  role: Joi.string().valid(...validRoles),
}).or('name', 'email', 'password', 'active', 'role')
