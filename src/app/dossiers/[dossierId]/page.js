import {getDossier} from '@/app/api/dossiers.js'
import {getPreleveur} from '@/app/api/points-prelevement.js'
import DossierHeader from '@/components/declarations/dossier/dossier-header.js'
import DossierDetails from '@/components/declarations/dossier-details.js'
import {getPointsPrelevementId} from '@/lib/dossier.js'
import {getDossierDSURL} from '@/lib/urls.js'

const DossierPage = async ({params}) => {
  const {dossierId} = await params

  const dossier = await getDossier(dossierId)

  let preleveur = dossier?.demandeur
  if (dossier?.result?.preleveur) {
    const response = await getPreleveur(dossier.result.preleveur)
    if (response?._id) {
      preleveur = response
    }
  }

  return (
    <>
      <DossierHeader
        numero={dossier.number}
        status={dossier.status}
        dateDepot={dossier.dateDepot}
        dsUrl={getDossierDSURL(dossierId)}
      />

      <DossierDetails
        dossier={dossier}
        preleveur={preleveur}
        idPoints={getPointsPrelevementId(dossier)}
      />
    </>
  )
}

export default DossierPage

