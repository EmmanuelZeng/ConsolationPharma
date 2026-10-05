import { UserSchema } from '#database/schema'
import Achat from '#models/achat'
import Vente from '#models/vente'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  @hasMany(() => Vente)
  declare ventes: HasMany<typeof Vente>

  @hasMany(() => Achat)
  declare achats: HasMany<typeof Achat>

  @beforeCreate()
  static assignUuid(user: User) {
    if (!user.id) {
      user.id = randomUUID()
    }
  }

  get fullName() {
    return `${this.prenom} ${this.nom}`.trim()
  }

  get initials() {
    const first = this.prenom?.charAt(0) ?? ''
    const last = this.nom?.charAt(0) ?? ''
    return `${first}${last}`.toUpperCase() || this.email.slice(0, 2).toUpperCase()
  }
}
