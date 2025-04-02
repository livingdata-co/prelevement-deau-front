import {getPointPrelevement, getBnpe, getBss} from '@/app/api/points-prelevement.js'
import PointIdentification from '@/components/prelevements/point-identification.js'

const Page = async ({params}) => {
  const {id} = (await params)
  const pointPrelevement = await getPointPrelevement(id)
  const bss = await getBss(pointPrelevement.id_bss)
  const bnpe = await getBnpe(pointPrelevement.code_bnpe)

  return (
    <PointIdentification
      pointPrelevement={pointPrelevement}
      lienBss={bss?.lien_infoterre || ''}
      lienBnpe={bnpe?.uri_ouvrage || ''}
    />
  )
}

export default Page
