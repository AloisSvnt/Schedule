import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'schedules'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.date('day').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}