import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 36).primary().notNullable()
      table.string('nom').notNullable().unique()
      table.text('description').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
