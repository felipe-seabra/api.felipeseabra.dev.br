import { Request } from 'express'

// Define TypeScript enums corresponding to the Prisma enums
export enum ButtonType {
  REPOSITORIO = 'REPOSITORIO',
  SITE = 'SITE',
}

export enum Logo {
  INSTAGRAM = 'INSTAGRAM',
  LINKEDIN = 'LINKEDIN',
  FACEBOOK = 'FACEBOOK',
  EMAIL = 'EMAIL',
}

export enum Role {
  MASTER = 'MASTER',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUser {
  name: string
  email: string
  password: string
  active: boolean
  role: Role // Use the Role enum
}

export interface ICompany {
  name: string
  title: string
  description: string[]
  logo: string
  domain: string
}

export interface ISocial {
  name: string
  logo: Logo // Use the Logo enum
  url: string
  buttonType: ButtonType // Use the ButtonType enum
  active: boolean
}

export interface IAuthRequest extends Request {
  user?: IUser
}

export interface Payload {
  dataValues: {
    name: string
    email: string
  }
}
