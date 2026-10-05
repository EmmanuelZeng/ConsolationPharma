import Categorie from '#models/categorie'
import Medicament from '#models/medicament'
import { createCategorieValidator, updateCategorieValidator } from '#validators/categorie'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async index({ inertia }: HttpContext) {
    const categories = await Categorie.query().orderBy('nom', 'asc')

    return inertia.render('categories/index', {
      categories: categories.map((categorie) => ({
        id: categorie.id,
        nom: categorie.nom,
        description: categorie.description,
      })),
    })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('categories/create', {})
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createCategorieValidator)
    await Categorie.create(payload)

    session.flash('success', 'Catégorie créée.')
    return response.redirect().toRoute('categories.index')
  }

  async edit({ inertia, params }: HttpContext) {
    const categorie = await Categorie.findOrFail(params.id)

    return inertia.render('categories/edit', {
      categorie: {
        id: categorie.id,
        nom: categorie.nom,
        description: categorie.description,
      },
    })
  }

  async update({ request, response, session, params }: HttpContext) {
    const categorie = await Categorie.findOrFail(params.id)
    const payload = await request.validateUsing(updateCategorieValidator)

    if (payload.nom !== categorie.nom) {
      const existing = await Categorie.query()
        .where('nom', payload.nom)
        .whereNot('id', categorie.id)
        .first()
      if (existing) {
        session.flash('error', 'Ce nom de catégorie existe déjà.')
        return response.redirect().back()
      }
    }

    categorie.merge(payload)
    await categorie.save()

    session.flash('success', 'Catégorie mise à jour.')
    return response.redirect().toRoute('categories.index')
  }

  async destroy({ response, session, params }: HttpContext) {
    const categorie = await Categorie.findOrFail(params.id)
    const linked = await Medicament.query().where('categorie_id', categorie.id).count('* as total')

    if (Number(linked[0].$extras.total) > 0) {
      session.flash('error', 'Impossible de supprimer une catégorie utilisée par des médicaments.')
      return response.redirect().back()
    }

    await categorie.delete()
    session.flash('success', 'Catégorie supprimée.')
    return response.redirect().toRoute('categories.index')
  }
}
