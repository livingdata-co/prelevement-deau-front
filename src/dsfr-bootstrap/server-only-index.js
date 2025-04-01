import {
  DsfrHeadBase,
  createGetHtmlAttributes
} from '@codegouvfr/react-dsfr/next-app-router/server-only-index'
import Link from 'next/link'

import {defaultColorScheme} from './default-color-scheme.js'

export const {getHtmlAttributes} = createGetHtmlAttributes({defaultColorScheme})

export const DsfrHead = props => <DsfrHeadBase Link={Link} {...props} />
