'use client'

import {startReactDsfr} from '@codegouvfr/react-dsfr/next-appdir'
import Link from 'next/link'

import {defaultColorScheme} from './default-color-scheme.js'

// Initialisation de react-dsfr avec les paramètres nécessaires
startReactDsfr({defaultColorScheme, Link})

// Composant StartDsfr
export const StartDsfr = () => null
