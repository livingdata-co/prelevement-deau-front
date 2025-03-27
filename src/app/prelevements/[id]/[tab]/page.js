import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'

import PointLoader from '@/components/prelevements/point-loader.js'

const Page = async ({params}) => {
  const {id, tab} = (await params)
  const selectedTab = tab || 'identification'

  return (
    <>
      <div className='pt-5 pl-5'>
        <ArrowBackIcon className='pr-1' />
        <Link href={`/prelevements?point-prelevement=${id}`}>Retour</Link>
      </div>
      <div className='fr-container mt-4'>
        <PointLoader
          id={id}
          selectedTab={selectedTab}
        />
      </div>
    </>
  )
}

export default Page
