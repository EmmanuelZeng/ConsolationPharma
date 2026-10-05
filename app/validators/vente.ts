import vine from '@vinejs/vine'

const venteLineSchema = vine.object({
  medicamentId: vine.string().uuid(),
  quantite: vine.number().min(1),
})

export const createVenteValidator = vine.create({
  lignes: vine.array(venteLineSchema).minLength(1),
})
