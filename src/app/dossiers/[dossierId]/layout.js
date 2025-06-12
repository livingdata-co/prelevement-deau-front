import {getDossier} from '@/app/api/dossiers.js'
import DossiersBreadcrumb from '@/components/declarations/dossier/dossiers-breadcrumb.js'

const DossierPage = async ({params, children}) => {
  const {dossierId} = await params

  const dossier = await getDossier(dossierId)

  return (
    <div className='fr-container mt-4'>
      <DossiersBreadcrumb numero={dossier.number} />
      {children}
    </div>
  )
}

export default DossierPage

