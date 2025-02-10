import {Highlight} from '@codegouvfr/react-dsfr/Highlight'
import {Box, Grid2} from '@mui/material'

const InfoBox = ({label, value}) => (
  <Box className='flex align-middle justify-between gap-2'>
    <b>{label} :</b> {value || <i>Non renseigné</i>}
  </Box>
)

const Modalite = ({modalite}) => (
  <Grid2
    container
    spacing={2}
    sx={{
      p: 2,
      justifyContent: 'space-around'
    }}
  >
    <Box>
      <InfoBox label='Débit prélevé' value={modalite.freq_debit_preleve} />
      <InfoBox label='Débit réservé' value={modalite.freq_debit_reserve} />
      <InfoBox label='Volume prélevé' value={modalite.freq_volume_preleve} />
    </Box>
    <Box>
      <InfoBox label='Niveau Eau' value={modalite.freq_niveau_eau} />
      <InfoBox label='Chlorure' value={modalite.freq_chlorures} />
      <InfoBox label='Conductivité' value={modalite.freq_conductivite} />
    </Box>
    <Box>
      <InfoBox label='Nitrates' value={modalite.freq_nitrates} />
      <InfoBox label='PH' value={modalite.freq_ph} />
      <InfoBox label='Sulfates' value={modalite.freq_sutlfates} />
    </Box>
    <Box>
      <InfoBox label='Temperature' value={modalite.freq_temperature} />
      <InfoBox label='Turbidité' value={modalite.freq_turbidite} />
    </Box>
    <Highlight>
      <b>Remarque :</b> <i>{modalite.remarque || 'Non renseigné'}</i>
    </Highlight>
  </Grid2>
)

export default Modalite
