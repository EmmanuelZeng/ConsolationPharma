/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.store']['types'],
  },
  'dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard',
    tokens: [{"old":"/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['dashboard']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
  },
  'profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/profile',
    tokens: [{"old":"/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.show']['types'],
  },
  'profile.update': {
    methods: ["PUT"],
    pattern: '/profile',
    tokens: [{"old":"/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.update']['types'],
  },
  'profile.password': {
    methods: ["PUT"],
    pattern: '/profile/password',
    tokens: [{"old":"/profile/password","type":0,"val":"profile","end":""},{"old":"/profile/password","type":0,"val":"password","end":""}],
    types: placeholder as Registry['profile.password']['types'],
  },
  'users.index': {
    methods: ["GET","HEAD"],
    pattern: '/users',
    tokens: [{"old":"/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.index']['types'],
  },
  'users.create': {
    methods: ["GET","HEAD"],
    pattern: '/users/create',
    tokens: [{"old":"/users/create","type":0,"val":"users","end":""},{"old":"/users/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['users.create']['types'],
  },
  'users.store': {
    methods: ["POST"],
    pattern: '/users',
    tokens: [{"old":"/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.store']['types'],
  },
  'users.edit': {
    methods: ["GET","HEAD"],
    pattern: '/users/:id/edit',
    tokens: [{"old":"/users/:id/edit","type":0,"val":"users","end":""},{"old":"/users/:id/edit","type":1,"val":"id","end":""},{"old":"/users/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['users.edit']['types'],
  },
  'users.update': {
    methods: ["PUT"],
    pattern: '/users/:id',
    tokens: [{"old":"/users/:id","type":0,"val":"users","end":""},{"old":"/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.update']['types'],
  },
  'users.destroy': {
    methods: ["DELETE"],
    pattern: '/users/:id',
    tokens: [{"old":"/users/:id","type":0,"val":"users","end":""},{"old":"/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.destroy']['types'],
  },
  'categories.index': {
    methods: ["GET","HEAD"],
    pattern: '/categories',
    tokens: [{"old":"/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['categories.index']['types'],
  },
  'categories.create': {
    methods: ["GET","HEAD"],
    pattern: '/categories/create',
    tokens: [{"old":"/categories/create","type":0,"val":"categories","end":""},{"old":"/categories/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['categories.create']['types'],
  },
  'categories.store': {
    methods: ["POST"],
    pattern: '/categories',
    tokens: [{"old":"/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['categories.store']['types'],
  },
  'categories.edit': {
    methods: ["GET","HEAD"],
    pattern: '/categories/:id/edit',
    tokens: [{"old":"/categories/:id/edit","type":0,"val":"categories","end":""},{"old":"/categories/:id/edit","type":1,"val":"id","end":""},{"old":"/categories/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['categories.edit']['types'],
  },
  'categories.update': {
    methods: ["PUT"],
    pattern: '/categories/:id',
    tokens: [{"old":"/categories/:id","type":0,"val":"categories","end":""},{"old":"/categories/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['categories.update']['types'],
  },
  'categories.destroy': {
    methods: ["DELETE"],
    pattern: '/categories/:id',
    tokens: [{"old":"/categories/:id","type":0,"val":"categories","end":""},{"old":"/categories/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['categories.destroy']['types'],
  },
  'medicaments.index': {
    methods: ["GET","HEAD"],
    pattern: '/medicaments',
    tokens: [{"old":"/medicaments","type":0,"val":"medicaments","end":""}],
    types: placeholder as Registry['medicaments.index']['types'],
  },
  'medicaments.create': {
    methods: ["GET","HEAD"],
    pattern: '/medicaments/create',
    tokens: [{"old":"/medicaments/create","type":0,"val":"medicaments","end":""},{"old":"/medicaments/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['medicaments.create']['types'],
  },
  'medicaments.store': {
    methods: ["POST"],
    pattern: '/medicaments',
    tokens: [{"old":"/medicaments","type":0,"val":"medicaments","end":""}],
    types: placeholder as Registry['medicaments.store']['types'],
  },
  'medicaments.edit': {
    methods: ["GET","HEAD"],
    pattern: '/medicaments/:id/edit',
    tokens: [{"old":"/medicaments/:id/edit","type":0,"val":"medicaments","end":""},{"old":"/medicaments/:id/edit","type":1,"val":"id","end":""},{"old":"/medicaments/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['medicaments.edit']['types'],
  },
  'medicaments.update': {
    methods: ["PUT"],
    pattern: '/medicaments/:id',
    tokens: [{"old":"/medicaments/:id","type":0,"val":"medicaments","end":""},{"old":"/medicaments/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medicaments.update']['types'],
  },
  'medicaments.destroy': {
    methods: ["DELETE"],
    pattern: '/medicaments/:id',
    tokens: [{"old":"/medicaments/:id","type":0,"val":"medicaments","end":""},{"old":"/medicaments/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medicaments.destroy']['types'],
  },
  'medicaments.show': {
    methods: ["GET","HEAD"],
    pattern: '/medicaments/:id',
    tokens: [{"old":"/medicaments/:id","type":0,"val":"medicaments","end":""},{"old":"/medicaments/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medicaments.show']['types'],
  },
  'fournisseurs.index': {
    methods: ["GET","HEAD"],
    pattern: '/fournisseurs',
    tokens: [{"old":"/fournisseurs","type":0,"val":"fournisseurs","end":""}],
    types: placeholder as Registry['fournisseurs.index']['types'],
  },
  'fournisseurs.create': {
    methods: ["GET","HEAD"],
    pattern: '/fournisseurs/create',
    tokens: [{"old":"/fournisseurs/create","type":0,"val":"fournisseurs","end":""},{"old":"/fournisseurs/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['fournisseurs.create']['types'],
  },
  'fournisseurs.store': {
    methods: ["POST"],
    pattern: '/fournisseurs',
    tokens: [{"old":"/fournisseurs","type":0,"val":"fournisseurs","end":""}],
    types: placeholder as Registry['fournisseurs.store']['types'],
  },
  'fournisseurs.edit': {
    methods: ["GET","HEAD"],
    pattern: '/fournisseurs/:id/edit',
    tokens: [{"old":"/fournisseurs/:id/edit","type":0,"val":"fournisseurs","end":""},{"old":"/fournisseurs/:id/edit","type":1,"val":"id","end":""},{"old":"/fournisseurs/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['fournisseurs.edit']['types'],
  },
  'fournisseurs.update': {
    methods: ["PUT"],
    pattern: '/fournisseurs/:id',
    tokens: [{"old":"/fournisseurs/:id","type":0,"val":"fournisseurs","end":""},{"old":"/fournisseurs/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['fournisseurs.update']['types'],
  },
  'fournisseurs.destroy': {
    methods: ["DELETE"],
    pattern: '/fournisseurs/:id',
    tokens: [{"old":"/fournisseurs/:id","type":0,"val":"fournisseurs","end":""},{"old":"/fournisseurs/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['fournisseurs.destroy']['types'],
  },
  'fournisseurs.show': {
    methods: ["GET","HEAD"],
    pattern: '/fournisseurs/:id',
    tokens: [{"old":"/fournisseurs/:id","type":0,"val":"fournisseurs","end":""},{"old":"/fournisseurs/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['fournisseurs.show']['types'],
  },
  'lots.index': {
    methods: ["GET","HEAD"],
    pattern: '/lots',
    tokens: [{"old":"/lots","type":0,"val":"lots","end":""}],
    types: placeholder as Registry['lots.index']['types'],
  },
  'lots.stock': {
    methods: ["GET","HEAD"],
    pattern: '/stock',
    tokens: [{"old":"/stock","type":0,"val":"stock","end":""}],
    types: placeholder as Registry['lots.stock']['types'],
  },
  'achats.index': {
    methods: ["GET","HEAD"],
    pattern: '/achats',
    tokens: [{"old":"/achats","type":0,"val":"achats","end":""}],
    types: placeholder as Registry['achats.index']['types'],
  },
  'achats.create': {
    methods: ["GET","HEAD"],
    pattern: '/achats/create',
    tokens: [{"old":"/achats/create","type":0,"val":"achats","end":""},{"old":"/achats/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['achats.create']['types'],
  },
  'achats.store': {
    methods: ["POST"],
    pattern: '/achats',
    tokens: [{"old":"/achats","type":0,"val":"achats","end":""}],
    types: placeholder as Registry['achats.store']['types'],
  },
  'achats.show': {
    methods: ["GET","HEAD"],
    pattern: '/achats/:id',
    tokens: [{"old":"/achats/:id","type":0,"val":"achats","end":""},{"old":"/achats/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['achats.show']['types'],
  },
  'ventes.index': {
    methods: ["GET","HEAD"],
    pattern: '/ventes',
    tokens: [{"old":"/ventes","type":0,"val":"ventes","end":""}],
    types: placeholder as Registry['ventes.index']['types'],
  },
  'ventes.create': {
    methods: ["GET","HEAD"],
    pattern: '/ventes/create',
    tokens: [{"old":"/ventes/create","type":0,"val":"ventes","end":""},{"old":"/ventes/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['ventes.create']['types'],
  },
  'ventes.store': {
    methods: ["POST"],
    pattern: '/ventes',
    tokens: [{"old":"/ventes","type":0,"val":"ventes","end":""}],
    types: placeholder as Registry['ventes.store']['types'],
  },
  'ventes.show': {
    methods: ["GET","HEAD"],
    pattern: '/ventes/:id',
    tokens: [{"old":"/ventes/:id","type":0,"val":"ventes","end":""},{"old":"/ventes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['ventes.show']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
