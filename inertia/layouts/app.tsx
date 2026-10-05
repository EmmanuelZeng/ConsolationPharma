import Logo from '~/components/logo'
import { type ReactNode } from 'react'
import {
  House,
  LogOut,
  Pill,
  Tags,
  Truck,
  Package,
  ShoppingCart,
  Receipt,
  Users,
  UserCircle,
} from 'lucide-react'
import { Form } from '@adonisjs/inertia/react'
import FlashToasts from '~/components/flash_toasts'
import ThemeToggle from '~/components/theme_toggle'
import NavLink, { type NavItem } from '~/components/nav_link'

const nav: NavItem[] = [
  { label: 'Dashboard', route: 'dashboard', icon: House },
  { label: 'Médicaments', route: 'medicaments.index', icon: Pill },
  { label: 'Catégories', route: 'categories.index', icon: Tags },
  { label: 'Fournisseurs', route: 'fournisseurs.index', icon: Truck },
  { label: 'Lots', route: 'lots.index', icon: Package },
  { label: 'Stock', route: 'lots.stock', icon: Package },
  { label: 'Achats', route: 'achats.index', icon: ShoppingCart },
  { label: 'Ventes', route: 'ventes.index', icon: Receipt },
  { label: 'Utilisateurs', route: 'users.index', icon: Users },
  { label: 'Profil', route: 'profile.show', icon: UserCircle },
]

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="header header--bar">
        <div className="header__inner">
          <Logo size={24} href="dashboard" />
          <div className="header__right">
            <ThemeToggle />
            <Form route="session.destroy">
              <button type="submit" className="btn btn--secondary btn--sm">
                <LogOut size={15} /> Déconnexion
              </button>
            </Form>
          </div>
        </div>
      </header>

      <nav className="subnav">
        <div className="subnav__inner">
          {nav.map(({ label, route, icon: Icon }) => (
            <NavLink key={label} route={route} className="subnav__item">
              {Icon && <Icon size={14} />}
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="app-main">{children}</div>
      <FlashToasts />
    </>
  )
}
