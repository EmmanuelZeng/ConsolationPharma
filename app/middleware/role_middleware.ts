import type { UserRole } from '#enums/user_role'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      roles: UserRole[]
    }
  ) {
    const user = ctx.auth.getUserOrFail()

    if (!options.roles.includes(user.role as UserRole)) {
      ctx.session.flash('error', 'Accès refusé.')
      return ctx.response.redirect().toRoute('dashboard')
    }

    return next()
  }
}
