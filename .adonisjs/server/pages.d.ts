import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'dashboard': ExtractProps<(typeof import('../../inertia/pages/dashboard.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'categories/create': ExtractProps<(typeof import('../../inertia/pages/categories/create.tsx'))['default']>
    'categories/index': ExtractProps<(typeof import('../../inertia/pages/categories/index.tsx'))['default']>
    'categories/edit': ExtractProps<(typeof import('../../inertia/pages/categories/edit.tsx'))['default']>
    'medicaments/index': ExtractProps<(typeof import('../../inertia/pages/medicaments/index.tsx'))['default']>
    'medicaments/create': ExtractProps<(typeof import('../../inertia/pages/medicaments/create.tsx'))['default']>
    'medicaments/edit': ExtractProps<(typeof import('../../inertia/pages/medicaments/edit.tsx'))['default']>
    'medicaments/show': ExtractProps<(typeof import('../../inertia/pages/medicaments/show.tsx'))['default']>
    'users/index': ExtractProps<(typeof import('../../inertia/pages/users/index.tsx'))['default']>
    'users/create': ExtractProps<(typeof import('../../inertia/pages/users/create.tsx'))['default']>
    'users/edit': ExtractProps<(typeof import('../../inertia/pages/users/edit.tsx'))['default']>
    'profile/show': ExtractProps<(typeof import('../../inertia/pages/profile/show.tsx'))['default']>
    'fournisseurs/index': ExtractProps<(typeof import('../../inertia/pages/fournisseurs/index.tsx'))['default']>
    'fournisseurs/create': ExtractProps<(typeof import('../../inertia/pages/fournisseurs/create.tsx'))['default']>
    'fournisseurs/edit': ExtractProps<(typeof import('../../inertia/pages/fournisseurs/edit.tsx'))['default']>
    'fournisseurs/show': ExtractProps<(typeof import('../../inertia/pages/fournisseurs/show.tsx'))['default']>
    'achats/index': ExtractProps<(typeof import('../../inertia/pages/achats/index.tsx'))['default']>
    'achats/create': ExtractProps<(typeof import('../../inertia/pages/achats/create.tsx'))['default']>
    'achats/show': ExtractProps<(typeof import('../../inertia/pages/achats/show.tsx'))['default']>
    'ventes/index': ExtractProps<(typeof import('../../inertia/pages/ventes/index.tsx'))['default']>
    'ventes/create': ExtractProps<(typeof import('../../inertia/pages/ventes/create.tsx'))['default']>
    'ventes/show': ExtractProps<(typeof import('../../inertia/pages/ventes/show.tsx'))['default']>
    'lots/index': ExtractProps<(typeof import('../../inertia/pages/lots/index.tsx'))['default']>
    'lots/stock': ExtractProps<(typeof import('../../inertia/pages/lots/stock.tsx'))['default']>
  }
}
