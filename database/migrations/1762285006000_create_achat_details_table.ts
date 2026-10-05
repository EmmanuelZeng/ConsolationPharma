import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'achat_details'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 36).primary().notNullable()
      table
        .string('achat_id', 36)
        .notNullable()
        .references('id')
        .inTable('achats')
        .onDelete('CASCADE')
      table
        .string('lot_id', 36)
        .notNullable()
        .references('id')
        .inTable('lots')
        .onDelete('RESTRICT')
      table.integer('quantite').notNullable()
      table.decimal('prix_unitaire', 12, 2).notNullable()
      table.decimal('sous_total', 12, 2).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
