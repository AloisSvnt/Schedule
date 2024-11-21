import type { HttpContext } from '@adonisjs/core/http'
import Folder from '#models/folder' 
import Schedule from '#models/schedule'
import string from '@adonisjs/core/helpers/string'

export default class FolderController {
  /**
   * Display a list of resource
   */
  async index({inertia}: HttpContext) {
    const folders = await Folder.all()
    return inertia.render('Folders/Index', { folders })
  }

  /**
   * Show the form for creating a new record
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('Folders/Create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {
    const folderData = request.only(['name', 'totalWorkTime']) as { name: string, totalWorkTime: number, slug?: string }
    let slug = string.slug(folderData.name, { remove: /[*+~.()'"!:@]/g })
    
    const existingFolder = await Folder.query().where('slug', 'like', `${slug}%`).orderBy('slug', 'desc').first()
    if (existingFolder) {
      const suffix = existingFolder.slug.match(/-(\d+)$/)?.[1]
      slug = `${slug}-${suffix ? parseInt(suffix) + 1 : 1}`
    }
    
    folderData.slug = slug
    await Folder.create(folderData)
    session.flash({ success: 'Folder created successfully' })
    return response.redirect().toRoute('folders.index')
  }

  /**
   * Show individual record
   */
  async show({ params, response, inertia }: HttpContext) {
    const folder = await Folder.findBy('slug', params.slug)
    const schedules = await Schedule.query().where('folder_id', folder.id).preload('user')
    return folder ? inertia.render('Folders/Show', { folder, schedules }) : response.status(404).send('Folder not found')
  }

  /**
   * Show the form for editing a record
   */
  async edit({ params, response, inertia }: HttpContext) {
    const folder = await Folder.findBy('slug', params.slug)
    return folder ? inertia.render('Folders/Edit', { folder }) : response.status(404).send('Folder not found')
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, session }: HttpContext) {
    if (!params || !params.slug) {
      return response.status(400).send('Bad request')
    }
    const folder = await Folder.findBy('slug', params.slug)
    if (!folder) {
      return response.status(404).send('Folder not found')
    }
    const folderData = request.only(['name', 'totalWorkTime']) as { name: string, totalWorkTime: number, slug?: string }
    let slug = string.slug(folderData.name, { remove: /[*+~.()'"!:@]/g })
  
    // Check if the new slug already exists, excluding the current folder
    const existingFolder = await Folder.query().where('slug', slug).whereNot('id', folder.id).first()
    if (existingFolder) {
      // If the exact slug exists, find the highest suffix and increment it
      const existingFolderWithSuffix = await Folder.query().where('slug', 'like', `${slug}-%`).whereNot('id', folder.id).orderBy('slug', 'desc').first()
      if (existingFolderWithSuffix) {
        const suffixMatch = existingFolderWithSuffix.slug.match(/-(\d+)$/)
        const suffix = suffixMatch ? parseInt(suffixMatch[1]) + 1 : 1
        slug = `${slug}-${suffix}`
      } else {
        slug = `${slug}-1`
      }
    }
  
    folderData.slug = slug
    folder.merge(folderData)
    await folder.save()
    session.flash({ success: 'Folder updated successfully' })
    return response.redirect().toRoute('folders.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, response, session }: HttpContext) {
    const folder = await Folder.findBy('slug',params.slug)
    if(!folder) {
      return response.status(404).send('Folder not found')
    }
    await folder.delete()
    session.flash({ success: 'Folder deleted successfully' })
    return response.redirect().toRoute('folders.index')
  }
}