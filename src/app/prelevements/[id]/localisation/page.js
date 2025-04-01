import {getLibelleCommune, getPointPrelevement} from '@/app/api/points-prelevement.js'
import PointLocalisation from '@/components/prelevements/point-localisation.js'

const Page = async ({params}) => {
  const {id} = (await params)
  const pointPrelevement = await getPointPrelevement(id)
  const commune = await getLibelleCommune(pointPrelevement.insee_com)

  return (
    <PointLocalisation
      pointPrelevement={pointPrelevement}
      libelleCommune={commune.nom}
    />
  )
}

export default Page
