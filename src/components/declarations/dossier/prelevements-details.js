import {Skeleton, Box} from '@mui/material'

import Compteur from './prelevements/compteur.js'

import PrelevementsAccordion from '@/components/declarations/dossier/prelevements/prelevements-accordion.js'
import Spreadsheet from '@/components/declarations/dossier/prelevements/spreadsheet.js'
import VolumesPompes from '@/components/declarations/dossier/prelevements/volumes-pompes.js'
import SectionCard from '@/components/ui/section-card.js'

const PrelevementsDetails = ({
  idPoints,
  pointsPrelevement,
  selectedPointId,
  relevesIndex,
  volumesPompes,
  compteur,
  files,
  selectedPoint,
  handleDownload,
  listRefs
}) => (
  <SectionCard title='Prélèvements' icon='fr-icon-drop-line'>
    {pointsPrelevement ? (
      idPoints.map(idPoint => {
        const file = files.find(file => file.result.data.metadata.pointPrelevement.split(' |')[0] === idPoint)

        return (
          <Box
            key={idPoint}
            ref={el => {
              listRefs.current[idPoint] = el
            }}
            className='my-2'
          >
            <PrelevementsAccordion
              idPoint={idPoint}
              isOpen={selectedPointId === idPoint}
              pointPrelevement={pointsPrelevement.find(point => point.id_point === idPoint)}
              status={file?.errors?.length > 0 ? 'error' : 'success'}
              handleSelect={() => selectedPoint(idPoint)}
            >
              {volumesPompes && volumesPompes.length > 0 && (
                <VolumesPompes volumesPompes={volumesPompes} />
              )}
              {compteur && (
                <Compteur compteur={compteur} relevesIndex={relevesIndex} />
              )}

              {files && files.length > 0 && (
                <Spreadsheet
                  file={file}
                  downloadFile={handleDownload}
                />
              )}
            </PrelevementsAccordion>
          </Box>
        )
      })
    ) : (
      <Skeleton variant='rectangular' height={300} />
    )}
  </SectionCard>
)

export default PrelevementsDetails
