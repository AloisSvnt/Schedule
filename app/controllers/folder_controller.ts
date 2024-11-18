import type { HttpContext } from '@adonisjs/core/http'
import Folder from '#models/folder' 
import slugify from '#utils/slugify'

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
    folderData.slug = slugify(folderData.name)
    await Folder.create(folderData)
    session.flash({ success: 'Folder created successfully' })
    return response.redirect().toRoute('folders.index')
  }

  /**
   * Show individual record
   */
  async show({ params, response, inertia }: HttpContext) {
    const folder = await Folder.findBy('slug', params.slug)
    return folder ? inertia.render('Folders/Show', { folder }) : response.status(404).send('Folder not found')
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
    if(!params || !params.slug) {
      return response.status(400).send('Bad request')
    }
    const folder = await Folder.findBy('slug', params.slug)
    if(!folder) {
      return response.status(404).send('Folder not found')
    }
    const folderData = request.only(['name', 'totalWorkTime']) as { name: string, totalWorkTime: number, slug?: string }
    folderData.slug = slugify(folderData.name)
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