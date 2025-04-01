'use client'

import {
  DsfrProviderBase,
  StartDsfrOnHydration
} from '@codegouvfr/react-dsfr/next-app-router'
import Link from 'next/link'

import {defaultColorScheme} from './default-color-scheme.js'

export const DsfrProvider = props => (
  <DsfrProviderBase
    defaultColorScheme={defaultColorScheme}
    Link={Link}
    {...props}
  />
)

export {StartDsfrOnHydration}
