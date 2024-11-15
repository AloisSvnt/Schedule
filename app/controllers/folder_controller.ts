import type { HttpContext } from '@adonisjs/core/http'
import Folder from '#models/folder' 

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
  public async create({ inertia }: HttpContext) {
    return inertia.render('Folders/Create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const folderData = request.only(['name', 'totalWorkTime']) as { name: string, totalWorkTime: number }
    await Folder.create(folderData)
    return response.redirect().toRoute('folders.index')
  }

  /**
   * Show individual record
   */
  async show({ params, response, inertia }: HttpContext) {
    const folder = await Folder.find(params.id)
    return folder ? inertia.render('Folders/Show', { folder }) : response.status(404).send('Folder not found')
  }

  /**
   * Show the form for editing a record
   */
  async edit({ params, response, inertia }: HttpContext) {
    const folder = await Folder.find(params.id)
    return folder ? inertia.render('Folders/Edit', { folder }) : response.status(404).send('Folder not found')
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    if(!params || !params.id) {
      return response.status(400).send('Bad request')
    }
    const folder = await Folder.find(params.id)
    if(!folder) {
      return response.status(404).send('Folder not found')
    }
    const folderData = request.only(['name', 'totalWorkTime']) as { name: string, totalWorkTime: number }
    folder.merge(folderData)
    await folder.save()
    return response.redirect().toRoute('folders.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const folder = await Folder.find(params.id)
    if(!folder) {
      return response.status(404).send('Folder not found')
    }
    await folder.delete()
    return response.redirect().toRoute('folders.index')
  }
}