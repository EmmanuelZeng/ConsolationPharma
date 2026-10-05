import { MedicamentSchema } from '#database/schema'
import Categorie from '#models/categorie'
import Lot from '#models/lot'
import { beforeCreate, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class Medicament extends MedicamentSchema {
  @belongsTo(() => Categorie)
  declare categorie: BelongsTo<typeof Categorie>

  @hasMany(() => Lot)
  declare lots: HasMany<typeof Lot>

  @beforeCreate()
  static assignUuid(medicament: Medicament) {
    if (!medicament.id) {
      medicament.id = randomUUID()
    }
  }
}
