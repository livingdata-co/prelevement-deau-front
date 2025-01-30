import {getPointsPrelevement} from '@/app/api/points-prelevement.js'
import MapContainer from '@/components/map/map-container.js'

const Page = async () => {
  const points = await getPointsPrelevement()

  return (
    <MapContainer points={points} />
  )
}

export default Page
