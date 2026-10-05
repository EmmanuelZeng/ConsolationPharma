import vine from '@vinejs/vine'

export const createCategorieValidator = vine.create({
  nom: vine.string().trim().minLength(2).maxLength(100).unique({ table: 'categories', column: 'nom' }),
  description: vine.string().trim().maxLength(500).optional(),
})

export const updateCategorieValidator = vine.create({
  nom: vine.string().trim().minLength(2).maxLength(100),
  description: vine.string().trim().maxLength(500).optional(),
})
