import { USER_ROLES } from '#enums/user_role'
import vine from '@vinejs/vine'

const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})

export const createUserValidator = vine.create({
  nom: vine.string().trim().minLength(2).maxLength(100),
  prenom: vine.string().trim().minLength(2).maxLength(100),
  email: email().unique({ table: 'users', column: 'email' }),
  password: password(),
  role: vine.enum(USER_ROLES),
})

export const updateUserValidator = vine.create({
  nom: vine.string().trim().minLength(2).maxLength(100),
  prenom: vine.string().trim().minLength(2).maxLength(100),
  email: email(),
  role: vine.enum(USER_ROLES),
})

export const updateProfileValidator = vine.create({
  nom: vine.string().trim().minLength(2).maxLength(100),
  prenom: vine.string().trim().minLength(2).maxLength(100),
  email: email(),
})

export const updatePasswordValidator = vine.create({
  currentPassword: vine.string(),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
})
