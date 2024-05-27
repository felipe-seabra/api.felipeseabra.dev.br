import bcrypt from 'bcrypt'
import Jwt from '../utils/jwt'
import { prismaClient } from '../database'

import { Payload } from '../interfaces'

export default class LoginService {
  static login = async (email: string, password: string) => {
    if (!(email && password)) {
      return {
        type: 'BAD_REQUEST',
        message: 'Some required fields are missing',
      }
    }

    try {
      const user = await prismaClient.user.findUnique({
        where: { email },
      })
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
          return { type: 'UNAUTHORIZED', message: 'Invalid password' }
        } else if (!user.active) {
          return { type: 'UNAUTHORIZED', message: 'User is not active' }
        }
      }
      if (!user) return { type: 'UNAUTHORIZED', message: 'Invalid fields' }

      const { id, name, role } = user

      const payload: Payload = {
        dataValues: {
          name: user.name,
          email: user.email,
        },
      }
      const token = Jwt.generateToken(payload)
      return {
        type: null,
        message: { id, name, email, role, token },
      }
    } catch (error) {
      return { type: 'UNAUTHORIZED', message: 'Invalid fields' }
    }
  }
}
