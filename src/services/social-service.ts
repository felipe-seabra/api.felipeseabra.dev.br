import { prismaClient } from '../database'

import { ISocial } from '../interfaces'

export default class SocialService {
  static createNewSocial = async (social: ISocial) => {
    try {
      await prismaClient.social.create({
        data: { ...social },
      })

      return { type: null, message: 'Social created successfully' }
    } catch (err) {
      console.log(err)
      return {
        type: 'SOCIAL_ALREADY_REGISTERED',
        message: 'Social already registered',
      }
    }
  }

  static findAllSocials = async () => {
    const socials = await prismaClient.social.findMany()
    if (socials.length === 0) {
      return { type: 'SOCIAL_NOT_FOUND', message: 'No social found' }
    }

    return { type: null, message: socials }
  }

  static findSocialById = async (id: string) => {
    const social = await prismaClient.social.findUnique({
      where: { id },
    })

    if (!social) {
      return { type: 'SOCIAL_NOT_FOUND', message: 'Social does not exists' }
    }

    return { type: null, message: social }
  }

  static updateSocialById = async (social: ISocial, id: string) => {
    try {
      await prismaClient.social.update({
        where: { id },
        data: { ...social },
      })

      return { type: null, message: 'Social updated successfully' }
    } catch (err) {
      return { type: 'SOCIAL_NOT_FOUND', message: 'Social does not exists' }
    }
  }

  static deleteSocialById = async (id: string) => {
    try {
      await prismaClient.social.delete({
        where: { id },
      })

      return { type: null, message: 'Social successfully deleted' }
    } catch (err) {
      return { type: 'SOCIAL_NOT_FOUND', message: 'Social does not exists' }
    }
  }
}
