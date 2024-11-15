import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {

  async index({ inertia }: HttpContext) {
    return inertia.render('Auth/Index')
  }

  async login({ request, auth, response, session }: HttpContext) {
    const { username, password } = request.only(['username', 'password']);
    try {
      const user = await User.verifyCredentials(username, password);
      await auth.use('web').login(user);
      session.flash({ success: 'You are logged in.' });
      await response.redirect('/dashboard');
    } catch (error) {
      session.flash({ error: 'Incorrect credentials.' });
      response.redirect('/login');
    }
  }

  async showLogin({ inertia }: HttpContext) {
    return inertia.render('Auth/Login')
  }

  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout();
    session.flash({ success: 'You have been logged out.' });
    response.redirect('/login');
  }

  async showRegister({ inertia }: HttpContext) {
    return inertia.render('Auth/Register')
  }

  async registerUser({ request, response, session }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])
    console.log(username, password)
    try {
      await User.create({ username, password })
      session.flash({ success: 'Your account has been successfully created.' })
      response.redirect('/login')
    } catch (error) {
      session.flash({ error: 'An error occurred while creating your account.' })
      response.redirect('/register')
    }
  }

  async showForgotPassword({ inertia }: HttpContext) {
    return inertia.render('Auth/ForgotPassword')
  }

}