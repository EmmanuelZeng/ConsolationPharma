import { UserRole } from '#enums/user_role'
import Categorie from '#models/categorie'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.updateOrCreate(
      { email: 'admin@consolation.pharma' },
      {
        nom: 'Admin',
        prenom: 'Consolation',
        password: '123456789*',
        role: UserRole.ADMIN,
      }
    )

    const categories = [
      { nom: 'Antibiotiques', description: 'Traitement des infections bactériennes' },
      { nom: 'Antalgiques', description: 'Soulagement de la douleur' },
      { nom: 'Anti-inflammatoires', description: 'Réduction de l inflammation' },
      { nom: 'Antipaludiques', description: 'Prévention et traitement du paludisme' },
      { nom: 'Vitamines', description: 'Compléments vitaminiques' },
      { nom: 'Sirop', description: 'Formes liquides pour enfants et adultes' },
    ]

    for (const categorie of categories) {
      await Categorie.updateOrCreate({ nom: categorie.nom }, categorie)
    }
  }
}
