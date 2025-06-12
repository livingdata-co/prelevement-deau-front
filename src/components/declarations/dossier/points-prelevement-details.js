import {Alert, Skeleton} from '@mui/material'

import PointsPrelevementsMap from '@/components/map/points-prelevements-map.js'
import SectionCard from '@/components/ui/section-card.js'

const PointsPrelevementDetails = ({pointsPrelevementId, pointsPrelevement, handleClick}) => (
  <SectionCard title='Points de prélèvement' icon='fr-icon-map-pin-2-line'>
    {pointsPrelevementId.length > 0 ? (
      pointsPrelevement ? (
        <PointsPrelevementsMap
          pointsPrelevement={pointsPrelevement}
          handleClick={handleClick}
        />
      ) : (
        <Skeleton variant='rectangular' height={300} />
      )
    ) : (
      <Alert severity='warning'>
        Aucun point de prélèvement n’a pu être identifié.
      </Alert>
    )}
  </SectionCard>
)

export default PointsPrelevementDetails
