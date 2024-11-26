import {Suspense} from 'react'

import {getDossiers} from '@/app/api/dossiers.js'
import DossiersErrors from '@/components/dossiers-errors.js'
import {TableSkeleton} from '@/components/skeletons.js'

const DossierListAsync = async () => {
  const dossiers = await getDossiers()
  const invalidDossiers = dossiers.filter(({isValid}) => !isValid)

  return (
    <DossiersErrors dossiers={invalidDossiers.map(dossier => ({
      ...dossier,
      errorsCount: dossier.files.reduce((acc, file) => acc + file.errors.length, 0)
    }))} />
  )
}

const Home = () => (
  <Suspense fallback={<TableSkeleton />}>
    <div className='fr-container'>
      <DossierListAsync />
    </div>
  </Suspense>
)

export default Home

