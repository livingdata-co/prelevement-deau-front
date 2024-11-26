'use client'

import {headerFooterDisplayItem} from '@codegouvfr/react-dsfr/Display'
import {Header as DSFRHeader} from '@codegouvfr/react-dsfr/Header'
import {usePathname} from 'next/navigation'

import LoginHeaderItem from '@/components/ui/login-header-item.js'

const navigationItems = [
  {href: '/', text: 'Démarches simplifées'},
  {href: '/prelevements-deau', text: 'Prélèvements d’eau'},
  {href: '/preleveurs', text: 'Préleveurs'},
  {href: '/points-prelevement', text: 'Points de prélèvement'}
]

const HeaderComponent = ({user}) => {
  const pathname = usePathname()

  const isActive = href => {
    if (href === '/') {
      return pathname === href // Correspondance exacte pour "/"
    }

    return pathname.startsWith(href) // Correspondance partielle pour les autres chemins
  }

  return (
    <DSFRHeader
      brandTop={<>INTITULE<br />OFFICIEL</>}
      serviceTitle='Prélèvement d’eau'
      homeLinkProps={{
        href: '/',
        title: 'Accueil - Nom de l’entité (ministère, secrétariat d’état, gouvernement)'
      }}
      quickAccessItems={[
        headerFooterDisplayItem,
        {
          iconId: 'fr-icon-logout',
          linkProps: {
            href: 'mailto:contact@code.gouv.fr'
          },
          text: 'Nous contacter'
        },
        user ? <LoginHeaderItem key={0} /> : null
      ]}
      navigation={
        navigationItems.map(({href, text}) => ({
          linkProps: {
            href,
            target: '_self'
          },
          text,
          isActive: isActive(href)
        }))
      }
    />
  )
}

export default HeaderComponent
