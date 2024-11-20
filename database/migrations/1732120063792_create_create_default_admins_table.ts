import { BaseSchema } from '@adonisjs/lucid/schema'
import User from '#models/user'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    const trx = await this.db.transaction()
    try {
      await User.create(
        {
          username: 'admin',
          password: 'password',
        },
        { client: trx }
      )
      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  async down() {
    const trx = await this.db.transaction()
    try {
      await User.query({ client: trx }).where('username', 'admin').delete()
      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
