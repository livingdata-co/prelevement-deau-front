import {Box, Chip, Typography} from '@mui/material'

const LabelValue = ({label, value}) => {
  if (value) {
    return (
      <Box>
        <b>{label} : </b>
        <i>{value}</i>
      </Box>
    )
  }
}

const PointLocalistation = ({pointPrelevement}) => (
  <Box sx={{m: 2, p: 3}}>
    <Typography
      gutterBottom
      variant='h3'
    >
      {pointPrelevement.libelleCommune} - {pointPrelevement.insee_com}
    </Typography>
    <LabelValue label='Détails de localisation' value={pointPrelevement.detail_localisation} />
    <LabelValue label='Précision géométrique' value={pointPrelevement.precision_geom} />
    {pointPrelevement.type_milieu && (
      <Box><b>Type de milieu :</b> <Chip label={pointPrelevement.type_milieu} /></Box>
    )}
    {pointPrelevement.type_milieu === 'Eau souterraine' && (
      <>
        {pointPrelevement.profondeur && (
          <Box>
            <b>Profondeur</b>
            <i>{pointPrelevement.profondeur} m</i>
          </Box>
        )}
        <LabelValue label='Profondeur' value={pointPrelevement.profondeur} />
        <LabelValue label='Masse d’eau souterraine (DCE)' value={pointPrelevement.meso.nom_provis} />
        <LabelValue label='Zone de répartition des eaux' value={pointPrelevement.zre ? 'oui' : null} />
      </>
    )}
    {pointPrelevement.type_milieu === 'Eau de surface' && (
      <>
        {pointPrelevement.meContinentalesBv && (
          <LabelValue
            label='Masse d’eau cours d’eau (DCE)'
            value={`${pointPrelevement.meContinentalesBv.code_dce} - ${pointPrelevement.meContinentalesBv.nom}`}
          />
        )}
        <LabelValue label='Cours d’eau (BD Carthage)' value={pointPrelevement.bvBdCarthage?.toponyme_t} />
        <LabelValue label='Cours d’eau' value={pointPrelevement.cours_eau} />
        <LabelValue label='Zone de répartition des eaux' value={pointPrelevement.zre ? 'oui' : null} />
        <LabelValue label='Réservoir biologique' value={pointPrelevement.reservoir_biologique ? 'oui' : null} />
      </>
    )}
  </Box>
)

export default PointLocalistation
