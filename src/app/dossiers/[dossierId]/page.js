import {Button} from '@codegouvfr/react-dsfr/Button'
import {Typography} from '@mui/material'
import {deburr, lowerCase} from 'lodash-es'

import {getDossier} from '@/app/api/dossiers.js'
import {getPointPrelevement, getPreleveurs} from '@/app/api/points-prelevement.js'
import DossierDetails from '@/components/declarations/dossier-details.js'
import {getDossierDSURL} from '@/lib/urls.js'

const DossierPage = async ({params}) => {
  const {dossierId} = await params

  const dossier = await getDossier(dossierId)

  let preleveur // Temporary until API send preleveur id
  if (dossier.demandeur) {
    const preleveurs = await getPreleveurs()
    preleveur = preleveurs.find(({nom, prenom}) => deburr(lowerCase(`${nom}-${prenom}`)) === deburr(lowerCase(`${dossier.demandeur.nom}-${dossier.demandeur.prenom}`)))
  }

  let pointPrelevement // Temporary until API send pointPrelevement id
  if (dossier.pointPrelevement) {
    pointPrelevement = await getPointPrelevement(dossier.pointPrelevement)
  }

  return (
    <>
      <div className='flex justify-between flex-wrap'>
        <Typography variant='h3'>Dossier n°{dossier.number}</Typography>
        <Button
          priority='secondary'
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
          preleveur={preleveur}
          pointPrelevement={pointPrelevement}
        />
      </div>
    </>
  )
}

export default DossierPage

