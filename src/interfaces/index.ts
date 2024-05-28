import { Request } from 'express'

// Define TypeScript enums corresponding to the Prisma enums

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
  url: string
  active: boolean
}

export interface IProject {
  name: string
  image: string
  description: string[]
  url: string
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
