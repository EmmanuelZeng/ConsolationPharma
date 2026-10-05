import vine from '@vinejs/vine'

export const createMedicamentValidator = vine.create({
  nom: vine.string().trim().minLength(2).maxLength(150),
  description: vine.string().trim().maxLength(500).optional(),
  categorieId: vine.string().uuid(),
  prixVente: vine.number().min(0),
  seuilAlerte: vine.number().min(0),
})

export const updateMedicamentValidator = vine.create({
  nom: vine.string().trim().minLength(2).maxLength(150),
  description: vine.string().trim().maxLength(500).optional(),
  categorieId: vine.string().uuid(),
  prixVente: vine.number().min(0),
  seuilAlerte: vine.number().min(0),
})
