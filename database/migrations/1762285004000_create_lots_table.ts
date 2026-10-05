import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'lots'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 36).primary().notNullable()
      table
        .string('medicament_id', 36)
        .notNullable()
        .references('id')
        .inTable('medicaments')
        .onDelete('RESTRICT')
      table
        .string('fournisseur_id', 36)
        .nullable()
        .references('id')
        .inTable('fournisseurs')
        .onDelete('SET NULL')
      table.string('numero_lot').notNullable()
      table.integer('quantite').notNullable()
      table.decimal('prix_achat', 12, 2).notNullable()
      table.date('date_expiration').notNullable()
      table.date('date_reception').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
