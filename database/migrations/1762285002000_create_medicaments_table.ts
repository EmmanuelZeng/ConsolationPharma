import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'medicaments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 36).primary().notNullable()
      table
        .string('categorie_id', 36)
        .notNullable()
        .references('id')
        .inTable('categories')
        .onDelete('RESTRICT')
      table.string('nom').notNullable()
      table.text('description').nullable()
      table.decimal('prix_vente', 12, 2).notNullable()
      table.integer('seuil_alerte').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
