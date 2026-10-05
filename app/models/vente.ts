import { VenteSchema } from '#database/schema'
import User from '#models/user'
import VenteDetail from '#models/vente_detail'
import { beforeCreate, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class Vente extends VenteSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => VenteDetail)
  declare details: HasMany<typeof VenteDetail>

  @beforeCreate()
  static assignUuid(vente: Vente) {
    if (!vente.id) {
      vente.id = randomUUID()
    }
  }
}
