import type { HttpContext } from '@adonisjs/core/http'
import Schedule from '#models/schedule'
import Folder from '#models/folder'
import { DateTime } from 'luxon'

export default class ScheduleController {
  /**
   * Display a list of resource
   */
  async index({inertia}: HttpContext) {
    const schedules = await Schedule.all()
    const folders = await Folder.all()
    return inertia.render('Schedule/Index', { schedules, folders })
  }

  /**
   * Display form to create a new record
   */
  async create({inertia}: HttpContext) {
    return inertia.render('Schedule/Create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session, auth }: HttpContext) {
    const scheduleData = request.only(['folderId', 'description', 'workTime', 'day']) as { folderId: number, description: string, workTime: number, day: DateTime, userId?: number }
    scheduleData.userId = auth.user!.id
    scheduleData.day = DateTime.fromISO(scheduleData.day as unknown as string).toISODate()
    await Schedule.create(scheduleData)
    session.flash({ success: 'Schedule created successfully' })
    return response.redirect().toRoute('schedule.index')
  }

  /**
   * Show individual record
   */
  async show({ params, response, inertia }: HttpContext) {
    const schedule = await Schedule.find(params.id)
    return schedule ? inertia.render('Schedule/Show', { schedule }) : response.status(404).send('Schedule not found')
  }

  /**
   * Edit individual record
   */
  async edit({ params, response, inertia }: HttpContext) {
    const schedule = await Schedule.find(params.id)
    return schedule ? inertia.render('Schedule/Edit', { schedule }) : response.status(404).send('Schedule not found')
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, session, auth }: HttpContext) {
    if(!params || !params.id) {
      return response.status(400).send('Bad request')
    }
    const schedule = await Schedule.find(params.id)
    if(!schedule) {
      return response.status(404).send('Schedule not found')
    }
    const scheduleData = request.only(['folderId', 'description', 'workTime', 'day']) as { folderId: number, description: string, workTime: number, day: DateTime<boolean>, userId?: number }
    scheduleData.userId = auth.user!.id
    scheduleData.day = DateTime.fromISO(scheduleData.day as unknown as string).toISODate()
    schedule.merge(scheduleData)
    await schedule.save()
    session.flash({ success: 'Schedule updated successfully' })
    return response.redirect().toRoute('schedule.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, response, session }: HttpContext) {
    const schedule = await Schedule.find(params.id)
    if(!schedule) {
      return response.status(404).send('Schedule not found')
    }
    await schedule.delete()
    session.flash({ success: 'Schedule deleted successfully' })
    return response.redirect().toRoute('schedule.index')
  }
}