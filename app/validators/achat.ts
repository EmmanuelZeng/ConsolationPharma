import vine from '@vinejs/vine'

const achatLineSchema = vine.object({
  medicamentId: vine.string().uuid(),
  numeroLot: vine.string().trim().minLength(2).maxLength(100),
  quantite: vine.number().min(1),
  prixUnitaire: vine.number().min(0),
  dateExpiration: vine.string(),
})

export const createAchatValidator = vine.create({
  fournisseurId: vine.string().uuid(),
  dateAchat: vine.string(),
  lignes: vine.array(achatLineSchema).minLength(1),
})
