import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'folders'

  async up() {
    // Vider la table
    await this.db.rawQuery(`DELETE FROM ${this.tableName}`)

    // Ajouter la colonne slug avec les contraintes
    this.schema.alterTable(this.tableName, (table) => {
      table.string('slug').unique().notNullable().defaultTo('')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}