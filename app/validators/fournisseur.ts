import vine from '@vinejs/vine'

export const createFournisseurValidator = vine.create({
  nom: vine.string().trim().minLength(2).maxLength(150),
  telephone: vine.string().trim().maxLength(30).optional(),
  email: vine.string().email().maxLength(254).optional(),
  adresse: vine.string().trim().maxLength(500).optional(),
})

export const updateFournisseurValidator = createFournisseurValidator
