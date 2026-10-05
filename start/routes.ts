/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
*/

import { UserRole } from '#enums/user_role'
import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

const adminOnly = middleware.role({ roles: [UserRole.ADMIN] })
const pharmacyStaff = middleware.role({ roles: [UserRole.ADMIN, UserRole.PHARMACIEN] })
const salesStaff = middleware.role({ roles: [UserRole.ADMIN, UserRole.PHARMACIEN, UserRole.CAISSIER] })

router
  .group(() => {
    router.get('/', [controllers.Session, 'create']).as('session.create')
    router.post('/login', [controllers.Session, 'store']).as('session.store')
  })
  .use(middleware.guest())

router
  .group(() => {
    router.get('dashboard', [controllers.Dashboard, 'index']).as('dashboard')
    router.post('logout', [controllers.Session, 'destroy']).as('session.destroy')

    router.get('profile', [controllers.Profiles, 'show']).as('profile.show')
    router.put('profile', [controllers.Profiles, 'update']).as('profile.update')
    router.put('profile/password', [controllers.Profiles, 'updatePassword']).as('profile.password')

    router
      .group(() => {
        router.get('users', [controllers.Users, 'index']).as('users.index')
        router.get('users/create', [controllers.Users, 'create']).as('users.create')
        router.post('users', [controllers.Users, 'store']).as('users.store')
        router.get('users/:id/edit', [controllers.Users, 'edit']).as('users.edit')
        router.put('users/:id', [controllers.Users, 'update']).as('users.update')
        router.delete('users/:id', [controllers.Users, 'destroy']).as('users.destroy')
      })
      .use(adminOnly)

    router.get('categories', [controllers.Categories, 'index']).as('categories.index')
    router
      .group(() => {
        router.get('categories/create', [controllers.Categories, 'create']).as('categories.create')
        router.post('categories', [controllers.Categories, 'store']).as('categories.store')
        router.get('categories/:id/edit', [controllers.Categories, 'edit']).as('categories.edit')
        router.put('categories/:id', [controllers.Categories, 'update']).as('categories.update')
        router.delete('categories/:id', [controllers.Categories, 'destroy']).as('categories.destroy')
      })
      .use(pharmacyStaff)

    router.get('medicaments', [controllers.Medicaments, 'index']).as('medicaments.index')
    router
      .group(() => {
        router.get('medicaments/create', [controllers.Medicaments, 'create']).as('medicaments.create')
        router.post('medicaments', [controllers.Medicaments, 'store']).as('medicaments.store')
        router.get('medicaments/:id/edit', [controllers.Medicaments, 'edit']).as('medicaments.edit')
        router.put('medicaments/:id', [controllers.Medicaments, 'update']).as('medicaments.update')
        router.delete('medicaments/:id', [controllers.Medicaments, 'destroy']).as('medicaments.destroy')
      })
      .use(pharmacyStaff)
    router.get('medicaments/:id', [controllers.Medicaments, 'show']).as('medicaments.show')

    router.get('fournisseurs', [controllers.Fournisseurs, 'index']).as('fournisseurs.index')
    router
      .group(() => {
        router.get('fournisseurs/create', [controllers.Fournisseurs, 'create']).as('fournisseurs.create')
        router.post('fournisseurs', [controllers.Fournisseurs, 'store']).as('fournisseurs.store')
        router.get('fournisseurs/:id/edit', [controllers.Fournisseurs, 'edit']).as('fournisseurs.edit')
        router.put('fournisseurs/:id', [controllers.Fournisseurs, 'update']).as('fournisseurs.update')
        router.delete('fournisseurs/:id', [controllers.Fournisseurs, 'destroy']).as('fournisseurs.destroy')
      })
      .use(pharmacyStaff)
    router.get('fournisseurs/:id', [controllers.Fournisseurs, 'show']).as('fournisseurs.show')

    router.get('lots', [controllers.Lots, 'index']).as('lots.index')
    router.get('stock', [controllers.Lots, 'stock']).as('lots.stock')

    router
      .group(() => {
        router.get('achats', [controllers.Achats, 'index']).as('achats.index')
        router.get('achats/create', [controllers.Achats, 'create']).as('achats.create')
        router.post('achats', [controllers.Achats, 'store']).as('achats.store')
        router.get('achats/:id', [controllers.Achats, 'show']).as('achats.show')
      })
      .use(pharmacyStaff)

    router
      .group(() => {
        router.get('ventes', [controllers.Ventes, 'index']).as('ventes.index')
        router.get('ventes/create', [controllers.Ventes, 'create']).as('ventes.create')
        router.post('ventes', [controllers.Ventes, 'store']).as('ventes.store')
        router.get('ventes/:id', [controllers.Ventes, 'show']).as('ventes.show')
      })
      .use(salesStaff)
  })
  .use(middleware.auth())
