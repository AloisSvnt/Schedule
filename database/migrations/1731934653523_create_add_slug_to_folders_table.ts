import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'folders'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('slug').unique().notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}