import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'

import {getDossiersURL} from '@/lib/urls.js'

const DossiersBreadcrumb = ({numero}) => (
  <Breadcrumb
    currentPageLabel={`Dossier n°${numero}`}
    segments={[{
      label: 'Dossiers',
      linkProps: {
        href: getDossiersURL()
      }
    }]}
  />
)

export default DossiersBreadcrumb
