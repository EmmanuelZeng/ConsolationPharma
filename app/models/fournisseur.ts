import { FournisseurSchema } from '#database/schema'
import Achat from '#models/achat'
import Lot from '#models/lot'
import { beforeCreate, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class Fournisseur extends FournisseurSchema {
  @hasMany(() => Lot)
  declare lots: HasMany<typeof Lot>

  @hasMany(() => Achat)
  declare achats: HasMany<typeof Achat>

  @beforeCreate()
  static assignUuid(fournisseur: Fournisseur) {
    if (!fournisseur.id) {
      fournisseur.id = randomUUID()
    }
  }
}
