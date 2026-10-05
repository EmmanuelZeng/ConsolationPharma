import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'achats'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 36).primary().notNullable()
      table
        .string('fournisseur_id', 36)
        .notNullable()
        .references('id')
        .inTable('fournisseurs')
        .onDelete('RESTRICT')
      table
        .string('user_id', 36)
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
      table.string('numero_achat').notNullable().unique()
      table.decimal('montant_total', 12, 2).notNullable()
      table.date('date_achat').notNullable()
      table.timestamp('created_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
