import {Badge} from '@codegouvfr/react-dsfr/Badge'

const labels = {
  accepte: {severity: 'success', label: 'Accepté'},
  'en-instruction': {severity: 'info', label: 'En instruction'},
  'en-construction': {severity: 'new', label: 'En construction'}
}

const DossierStateBadge = ({value}) => {
  const label = labels[value]
  return <Badge severity={label?.severity}>{label?.label}</Badge>
}

export default DossierStateBadge
