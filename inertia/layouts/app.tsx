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
      <div className="app-shell">
        <aside className="sidebar">
          <div className="sidebar__brand">
            <Logo size={22} href="dashboard" />
          </div>

          <nav className="sidebar__nav" aria-label="Navigation principale">
            {nav.map(({ label, route, icon: Icon }) => (
              <NavLink
                key={label}
                route={route}
                exact={route === 'dashboard'}
                className="sidebar__item"
              >
                {Icon && <Icon size={16} />}
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="app-shell__content">
          <header className="app-topbar">
            <div className="app-topbar__actions">
              <ThemeToggle />
              <Form route="session.destroy">
                <button type="submit" className="btn btn--secondary btn--sm">
                  <LogOut size={15} /> Déconnexion
                </button>
              </Form>
            </div>
          </header>

          <main className="app-main">{children}</main>
        </div>
      </div>
      <FlashToasts />
    </>
  )
}
