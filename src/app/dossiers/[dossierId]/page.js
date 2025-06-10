import {Button} from '@codegouvfr/react-dsfr/Button'
import {Typography} from '@mui/material'

import {getDossier} from '@/app/api/dossiers.js'
import {getPointPrelevement} from '@/app/api/points-prelevement.js'
import DossierDetails from '@/components/declarations/dossier-details.js'
import {getDossierDSURL} from '@/lib/urls.js'

const DossierPage = async ({params}) => {
  const {dossierId} = await params

  const dossier = await getDossier(dossierId)

  let pointPrelevement
  if (dossier.pointPrelevement) {
    pointPrelevement = await getPointPrelevement(dossier.pointPrelevement)
  }

  return (
    <>
      <div className='flex justify-between flex-wrap'>
        <Typography variant='h3'>Dossier n°{dossier.numero}</Typography>
        <Button
          linkProps={{
            href: getDossierDSURL(dossier),
            target: '_blank'
          }}
        >
          Voir sur Démarches Simplifiees
        </Button>
      </div>

      <div className='my-4'>
        <DossierDetails
          dossier={dossier}
          pointPrelevement={pointPrelevement}
        />
      </div>
    </>
  )
}

export default DossierPage

