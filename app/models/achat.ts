import { AchatSchema } from '#database/schema'
import AchatDetail from '#models/achat_detail'
import Fournisseur from '#models/fournisseur'
import User from '#models/user'
import { beforeCreate, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class Achat extends AchatSchema {
  @belongsTo(() => Fournisseur)
  declare fournisseur: BelongsTo<typeof Fournisseur>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => AchatDetail)
  declare details: HasMany<typeof AchatDetail>

  @beforeCreate()
  static assignUuid(achat: Achat) {
    if (!achat.id) {
      achat.id = randomUUID()
    }
  }
}
