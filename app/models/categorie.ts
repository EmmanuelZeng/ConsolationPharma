import { CategorySchema } from '#database/schema'
import Medicament from '#models/medicament'
import { beforeCreate, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class Categorie extends CategorySchema {
  static table = 'categories'

  @hasMany(() => Medicament)
  declare medicaments: HasMany<typeof Medicament>

  @beforeCreate()
  static assignUuid(categorie: Categorie) {
    if (!categorie.id) {
      categorie.id = randomUUID()
    }
  }
}
