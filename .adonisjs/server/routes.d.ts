import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'profile.update': { paramsTuple?: []; params?: {} }
    'profile.password': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.create': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'users.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.index': { paramsTuple?: []; params?: {} }
    'categories.create': { paramsTuple?: []; params?: {} }
    'categories.store': { paramsTuple?: []; params?: {} }
    'categories.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medicaments.index': { paramsTuple?: []; params?: {} }
    'medicaments.create': { paramsTuple?: []; params?: {} }
    'medicaments.store': { paramsTuple?: []; params?: {} }
    'medicaments.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medicaments.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medicaments.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medicaments.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fournisseurs.index': { paramsTuple?: []; params?: {} }
    'fournisseurs.create': { paramsTuple?: []; params?: {} }
    'fournisseurs.store': { paramsTuple?: []; params?: {} }
    'fournisseurs.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fournisseurs.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fournisseurs.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fournisseurs.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'lots.index': { paramsTuple?: []; params?: {} }
    'lots.stock': { paramsTuple?: []; params?: {} }
    'achats.index': { paramsTuple?: []; params?: {} }
    'achats.create': { paramsTuple?: []; params?: {} }
    'achats.store': { paramsTuple?: []; params?: {} }
    'achats.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ventes.index': { paramsTuple?: []; params?: {} }
    'ventes.create': { paramsTuple?: []; params?: {} }
    'ventes.store': { paramsTuple?: []; params?: {} }
    'ventes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'session.create': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.create': { paramsTuple?: []; params?: {} }
    'users.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.index': { paramsTuple?: []; params?: {} }
    'categories.create': { paramsTuple?: []; params?: {} }
    'categories.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medicaments.index': { paramsTuple?: []; params?: {} }
    'medicaments.create': { paramsTuple?: []; params?: {} }
    'medicaments.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medicaments.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fournisseurs.index': { paramsTuple?: []; params?: {} }
    'fournisseurs.create': { paramsTuple?: []; params?: {} }
    'fournisseurs.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fournisseurs.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'lots.index': { paramsTuple?: []; params?: {} }
    'lots.stock': { paramsTuple?: []; params?: {} }
    'achats.index': { paramsTuple?: []; params?: {} }
    'achats.create': { paramsTuple?: []; params?: {} }
    'achats.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ventes.index': { paramsTuple?: []; params?: {} }
    'ventes.create': { paramsTuple?: []; params?: {} }
    'ventes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'session.create': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.create': { paramsTuple?: []; params?: {} }
    'users.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.index': { paramsTuple?: []; params?: {} }
    'categories.create': { paramsTuple?: []; params?: {} }
    'categories.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medicaments.index': { paramsTuple?: []; params?: {} }
    'medicaments.create': { paramsTuple?: []; params?: {} }
    'medicaments.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medicaments.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fournisseurs.index': { paramsTuple?: []; params?: {} }
    'fournisseurs.create': { paramsTuple?: []; params?: {} }
    'fournisseurs.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fournisseurs.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'lots.index': { paramsTuple?: []; params?: {} }
    'lots.stock': { paramsTuple?: []; params?: {} }
    'achats.index': { paramsTuple?: []; params?: {} }
    'achats.create': { paramsTuple?: []; params?: {} }
    'achats.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ventes.index': { paramsTuple?: []; params?: {} }
    'ventes.create': { paramsTuple?: []; params?: {} }
    'ventes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'categories.store': { paramsTuple?: []; params?: {} }
    'medicaments.store': { paramsTuple?: []; params?: {} }
    'fournisseurs.store': { paramsTuple?: []; params?: {} }
    'achats.store': { paramsTuple?: []; params?: {} }
    'ventes.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'profile.update': { paramsTuple?: []; params?: {} }
    'profile.password': { paramsTuple?: []; params?: {} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medicaments.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fournisseurs.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'medicaments.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fournisseurs.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}