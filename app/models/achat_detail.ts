import { AchatDetailSchema } from '#database/schema'
import Achat from '#models/achat'
import Lot from '#models/lot'
import { beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class AchatDetail extends AchatDetailSchema {
  @belongsTo(() => Achat)
  declare achat: BelongsTo<typeof Achat>

  @belongsTo(() => Lot)
  declare lot: BelongsTo<typeof Lot>

  @beforeCreate()
  static assignUuid(detail: AchatDetail) {
    if (!detail.id) {
      detail.id = randomUUID()
    }
  }
}
