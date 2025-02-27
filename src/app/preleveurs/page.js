import {Box, Typography} from '@mui/material'
import {orderBy} from 'lodash-es'

import {getBeneficiaires} from '@/app/api/points-prelevement.js'
import PreleveursList from '@/components/preleveurs/preleveurs-list.js'

const Page = async () => {
  const preleveurs = await getBeneficiaires()
  const orderedPreleveurs = orderBy(preleveurs, [p => Number.parseInt(p.id_beneficiaire, 10)])

  return (
    <Box className='flex flex-col fr-container h-full w-full'>
      <Typography variant='h4' className='fr-pt-3w'>Liste des préleveurs :</Typography>
      <PreleveursList preleveurs={orderedPreleveurs} />
    </Box>
  )
}

export default Page
