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
      .group(()=>{
        router.get('',[FolderController, 'index']).as('folders.index')
        router.get('/create',[FolderController, 'create']).as('folders.create')
        router.post('',[FolderController, 'store']).as('folders.store')
        router.get('/:slug',[FolderController, 'show']).as('folders.show')
        router.get('/:slug/edit',[FolderController, 'edit']).as('folders.edit')
        router.put('/:slug',[FolderController, 'update']).as('folders.update')
        router.delete('/:slug',[FolderController, 'destroy']).as('folders.destroy')
      })
      .prefix('/folders')

  })
  .prefix('/dashboard')
  .use(middleware.auth())
