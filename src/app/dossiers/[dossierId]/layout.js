import {getDossier} from '@/app/api/dossiers.js'
import Breadcrumb from '@/components/ui/breadcrumb.js'
import {getDossiersURL} from '@/lib/urls.js'

const DossierPage = async ({params, children}) => {
  const {dossierId} = await params

  const dossier = await getDossier(dossierId)

  return (
    <div className='fr-container mt-4'>
      <Breadcrumb
        currentPageLabel={`Dossier n°${dossier.number}`}
        segments={[{
          label: 'Dossiers',
          linkProps: {
            href: getDossiersURL()
          }
        }]}
      />

      {children}
    </div>
  )
}

export default DossierPage

