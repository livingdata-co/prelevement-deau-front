'use client'
import {Footer as DSFRFooter} from '@codegouvfr/react-dsfr/Footer'

const FooterComponent = () => (
  <DSFRFooter
    accessibility='fully compliant'
    contentDescription='
      Ce message est à remplacer par les informations de votre site.

      Comme exemple de contenu, vous pouvez indiquer les informations
      suivantes : Le site officiel d’information administrative pour les entreprises.
      Retrouvez toutes les informations et démarches administratives nécessaires à la création,
      à la gestion et au développement de votre entreprise.
      '
    operatorLogo={{
      alt: '[À MODIFIER - texte alternatif de l’image]',
      imgUrl: 'static/media/placeholder.9x16.bb7c62f0.png',
      orientation: 'vertical'
    }}
  />
)

export default FooterComponent
