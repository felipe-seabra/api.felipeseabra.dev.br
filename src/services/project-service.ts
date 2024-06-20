import { prismaClient } from '../database'

import { IProject } from '../interfaces'
import { createSlug } from '../utils/create-slug'

export default class ProjectService {
  static createNewProject = async (project: IProject) => {
    try {
      await prismaClient.project.create({
        data: { ...project, slug: createSlug(project.name) },
      })

      return { type: null, message: 'Project created successfully' }
    } catch (err) {
      console.log(err)
      return {
        type: 'PROJECT_ALREADY_REGISTERED',
        message: 'Project already registered',
      }
    }
  }

  static findAllProjects = async () => {
    const projects = await prismaClient.project.findMany()
    if (projects.length === 0) {
      return { type: 'PROJECT_NOT_FOUND', message: 'No project found' }
    }

    return { type: null, message: projects }
  }

  static findProjectById = async (id: string) => {
    const project = await prismaClient.project.findUnique({
      where: { id },
    })

    if (!project) {
      return { type: 'PROJECT_NOT_FOUND', message: 'Project does not exists' }
    }

    return { type: null, message: project }
  }

  static findProjectBySlug = async (slug: string) => {
    const project = await prismaClient.project.findUnique({
      where: { slug },
    })

    if (!project) {
      return { type: 'PROJECT_NOT_FOUND', message: 'Project does not exists' }
    }

    return { type: null, message: project }
  }

  static updateProjectById = async (project: IProject, id: string) => {
    try {
      await prismaClient.project.update({
        where: { id },
        data: { ...project, slug: createSlug(project.name) },
      })

      return { type: null, message: 'Project updated successfully' }
    } catch (err) {
      return { type: 'PROJECT_NOT_FOUND', message: 'Project does not exists' }
    }
  }

  static deleteProjectById = async (id: string) => {
    try {
      await prismaClient.project.delete({
        where: { id },
      })

      return { type: null, message: 'Project successfully deleted' }
    } catch (err) {
      return { type: 'PROJECT_NOT_FOUND', message: 'Project does not exists' }
    }
  }
}
