
import InvalidDossiersList from '@/components/dossiers-errors/invalid-dossiers-list.js'

const DossierErrors = ({dossiers}) => (
  <div className='flex flex-col gap-4'>
    <InvalidDossiersList dossiers={dossiers} />
  </div>
)

export default DossierErrors
