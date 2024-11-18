import type { HttpContext } from '@adonisjs/core/http'
import Schedule from '#models/schedule'

export default class ScheduleController {
  /**
   * Display a list of resource
   */
  async index({inertia}: HttpContext) {
    const schedules = await Schedule.all()
    return inertia.render('Schedules/Index', { schedules })
  }

  /**
   * Display form to create a new record
   */
  async create({inertia}: HttpContext) {
    return inertia.render('Schedules/Create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {
    const scheduleData = request.only(['name', 'id', 'description', 'workTime', 'userId']) as { name: string, id: number, description: string, workTime: number, userId: number }
    await Schedule.create(scheduleData)
    session.flash({ success: 'Schedule created successfully' })
    return response.redirect().toRoute('schedules.index')
  }

  /**
   * Show individual record
   */
  async show({ params, response, inertia }: HttpContext) {
    const schedule = await Schedule.find(params.id)
    return schedule ? inertia.render('Schedules/Show', { schedule }) : response.status(404).send('Schedule not found')
  }

  /**
   * Edit individual record
   */
  async edit({ params, response, inertia }: HttpContext) {
    const schedule = await Schedule.find(params.id)
    return schedule ? inertia.render('Schedules/Edit', { schedule }) : response.status(404).send('Schedule not found')
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
    const scheduleData = request.only(['name', 'id', 'description', 'workTime', 'userId']) as { name: string, id: number, description: string, workTime: number, userId: number }
    schedule.merge(scheduleData)
    await schedule.save()
    session.flash({ success: 'Schedule updated successfully' })
    return response.redirect().toRoute('schedules.index')
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
    return response.redirect().toRoute('schedules.index')
  }
}