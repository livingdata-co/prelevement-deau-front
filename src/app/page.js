import {Alert} from '@codegouvfr/react-dsfr/Alert'

import {getDossiers} from '@/app/api/dossiers.js'
import InvalidDossiersList from '@/components/dossiers-errors/invalid-dossiers-list.js'

const Home = async () => {
  let dossiers = []
  let error = null

  try {
    dossiers = await getDossiers()
  } catch (error_) {
    console.error('Erreur lors de la récupération des dossiers:', error_)
    error = 'Une erreur est survenue lors du chargement des dossiers. Veuillez réessayer plus tard.'
  }

  const invalidDossiers = dossiers.filter(({isValid}) => !isValid)

  return (
    <div className='fr-container'>
      {error ? (
        <Alert
          closable
          description={error}
          severity='error'
          title='Erreur de chargement'
        />
      ) : (
        <InvalidDossiersList dossiers={invalidDossiers.map(dossier => ({
          ...dossier,
          errorsCount: dossier.files.reduce((acc, file) => acc + file.errors.length, 0)
        }))} />
      )}
    </div>
  )
}

export default Home
