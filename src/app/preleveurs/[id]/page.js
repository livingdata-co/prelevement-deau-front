import {Box, Chip, Typography} from '@mui/material'
import Link from 'next/link'

import {getBeneficiaire, getPointsFromBeneficiaire} from '@/app/api/points-prelevement.js'
import {getUsagesColors} from '@/components/map/legend-colors.js'

const Page = async ({params}) => {
  const {id} = await params
  const preleveur = await getBeneficiaire(id)
  const points = await getPointsFromBeneficiaire(id)

  return (
    <Box className='fr-container h-full w-full flex flex-col gap-5 mb-5'>
      <Typography variant='h4' className='fr-mt-3w'>
        {id} - {preleveur.civilite} {preleveur.nom} {preleveur.prenom} {preleveur.sigle} {preleveur.raison_sociale}
        <p className='italic'>
          {preleveur.exploitations.length} {preleveur.exploitations.length === 1
            ? 'exploitation'
            : 'exploitations'}
        </p>
      </Typography>
      <div className='italic'>
        <b>Usages : </b>
        {preleveur.usages && preleveur.usages.length > 0 && preleveur.usages.map(u => (
          <Chip
            key={`${u}`}
            label={u}
            sx={{
              ml: 1,
              backgroundColor: getUsagesColors(u)?.color,
              color: getUsagesColors(u)?.textColor
            }}
          />
        ))}
      </div>
      <div><b>Points rattachés : </b>
        {points.map(point => (
          <div key={point.id_point}>
            <Link href={`/points-prelevement/${point.id_point}`}>
              {point.id_point} - {point.nom}
            </Link>
          </div>
        ))}
      </div>
    </Box>
  )
}

export default Page
