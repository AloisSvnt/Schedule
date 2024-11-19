import type { HttpContext } from '@adonisjs/core/http'
import Schedule from '#models/schedule'

export default class ScheduleController {
  /**
   * Display a list of resource
   */
  async index({inertia}: HttpContext) {
    const schedules = await Schedule.all()
    return inertia.render('Schedule/Index', { schedules })
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
  async store({ request, response, session }: HttpContext) {
    const scheduleData = request.only(['folderId', 'description', 'workTime', 'date']) as { folderId: number, description: string, workTime: number, date: string }
    scheduleData.userId = auth.user!.id
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
  async update({ params, request, response, session }: HttpContext) {
    if(!params || !params.id) {
      return response.status(400).send('Bad request')
    }
    const schedule = await Schedule.find(params.id)
    if(!schedule) {
      return response.status(404).send('Schedule not found')
    }
    const scheduleData = request.only(['folderId', 'description', 'workTime', 'date']) as { folderId: number, description: string, workTime: number, date: string }
    scheduleData.userId = auth.user!.id
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