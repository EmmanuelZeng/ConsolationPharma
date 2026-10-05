/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  dashboard: typeof routes['dashboard']
  profile: {
    show: typeof routes['profile.show']
    update: typeof routes['profile.update']
    password: typeof routes['profile.password']
  }
  users: {
    index: typeof routes['users.index']
    create: typeof routes['users.create']
    store: typeof routes['users.store']
    edit: typeof routes['users.edit']
    update: typeof routes['users.update']
    destroy: typeof routes['users.destroy']
  }
  categories: {
    index: typeof routes['categories.index']
    create: typeof routes['categories.create']
    store: typeof routes['categories.store']
    edit: typeof routes['categories.edit']
    update: typeof routes['categories.update']
    destroy: typeof routes['categories.destroy']
  }
  medicaments: {
    index: typeof routes['medicaments.index']
    create: typeof routes['medicaments.create']
    store: typeof routes['medicaments.store']
    edit: typeof routes['medicaments.edit']
    update: typeof routes['medicaments.update']
    destroy: typeof routes['medicaments.destroy']
    show: typeof routes['medicaments.show']
  }
  fournisseurs: {
    index: typeof routes['fournisseurs.index']
    create: typeof routes['fournisseurs.create']
    store: typeof routes['fournisseurs.store']
    edit: typeof routes['fournisseurs.edit']
    update: typeof routes['fournisseurs.update']
    destroy: typeof routes['fournisseurs.destroy']
    show: typeof routes['fournisseurs.show']
  }
  lots: {
    index: typeof routes['lots.index']
    stock: typeof routes['lots.stock']
  }
  achats: {
    index: typeof routes['achats.index']
    create: typeof routes['achats.create']
    store: typeof routes['achats.store']
    show: typeof routes['achats.show']
  }
  ventes: {
    index: typeof routes['ventes.index']
    create: typeof routes['ventes.create']
    store: typeof routes['ventes.store']
    show: typeof routes['ventes.show']
  }
}
