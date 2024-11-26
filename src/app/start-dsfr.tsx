'use client'

import {startReactDsfr} from '@codegouvfr/react-dsfr/next-appdir'
import Link from 'next/link'

import {defaultColorScheme} from './default-color-scheme.ts'

declare module '@codegouvfr/react-dsfr/next-appdir' {
  type RegisterLink = {
    Link: typeof Link;
  }
}

startReactDsfr({defaultColorScheme, Link})

export const StartDsfr = () => null

