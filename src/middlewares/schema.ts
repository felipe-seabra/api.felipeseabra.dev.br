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

export const newCompanySchema = Joi.object({
  name: Joi.string().min(3).required(),
  title: Joi.string().min(8).required(),
  description: Joi.array().items(Joi.string()).required(),
  logo: Joi.string().uri().required(),
  domain: Joi.string().uri().required(),
})

export const updateCompanySchema = Joi.object({
  name: Joi.string().min(3),
  title: Joi.string().min(8),
  description: Joi.array().items(Joi.string()),
  logo: Joi.string().uri(),
  domain: Joi.string().uri(),
}).or('name', 'title', 'description', 'logo', 'domain')

export const newSocialSchema = Joi.object({
  name: Joi.string().min(1).required(),
  url: Joi.string().uri().required(),
  active: Joi.boolean().required(),
})

export const updateSocialSchema = Joi.object({
  name: Joi.string().min(1),
  url: Joi.string().uri(),
  active: Joi.boolean(),
}).or('name', 'url', 'active')

export const newProjectSchema = Joi.object({
  name: Joi.string().min(1).required(),
  image: Joi.string().uri().required(),
  description: Joi.array().items(Joi.string()).required(),
  url: Joi.string().uri().required(),
  active: Joi.boolean().required(),
})

export const updateProjectSchema = Joi.object({
  name: Joi.string().min(1),
  image: Joi.string().uri(),
  description: Joi.array().items(Joi.string()),
  url: Joi.string().uri(),
  active: Joi.boolean(),
}).or('name', 'image', 'description', 'url', 'active')
