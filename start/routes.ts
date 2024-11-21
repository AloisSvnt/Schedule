/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const DashboardController = () => import('#controllers/dashboard_controller')
const FolderController = () => import('#controllers/folder_controller')
const ScheduleController = () => import('#controllers/schedule_controller')
const SessionController = () => import('#controllers/auth/session_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.on('/').redirect('/dashboard')

router
  .group(() => {
    router.get('/login', [SessionController, 'showLogin']).as('showLogin')
    router.post('/login', [SessionController, 'login']).as('login')
  })
  .use(middleware.guest())

router
  .group(() => {
    router.get('/logout', [SessionController, 'logout']).as('logout')
    router.get('/register', [SessionController, 'showRegister']).as('showRegister')
    router.post('/register', [SessionController, 'registerUser']).as('register')
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('', [DashboardController, 'index']).as('dashboard')

    router
      .group(() => {
        router.get('', [FolderController, 'index']).as('folders.index')
        router.get('/create', [FolderController, 'create']).as('folders.create')
        router.post('', [FolderController, 'store']).as('folders.store')
        router.get('/:slug', [FolderController, 'show']).as('folders.show')
        router.get('/:slug/edit', [FolderController, 'edit']).as('folders.edit')
        router.put('/:slug', [FolderController, 'update']).as('folders.update')
        router.delete('/:slug', [FolderController, 'destroy']).as('folders.destroy')
      })
      .prefix('/folders')

    router
      .group(() => {
        router.get('', [ScheduleController, 'index']).as('schedule.index')
        router.get('/create', [ScheduleController, 'create']).as('schedule.create')
        router.post('', [ScheduleController, 'store']).as('schedule.store')
        router.get('/:id', [ScheduleController, 'show']).as('schedule.show')
        router.get('/:id/edit', [ScheduleController, 'edit']).as('schedule.edit')
        router.put('/:id', [ScheduleController, 'update']).as('schedule.update')
        router.delete('/:id', [ScheduleController, 'destroy']).as('schedule.destroy')
      })
      .prefix('/schedule')
  })
  .prefix('/dashboard')
  .use(middleware.auth())
