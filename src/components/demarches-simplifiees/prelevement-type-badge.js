import {Badge} from '@codegouvfr/react-dsfr/Badge'

const labels = {
  'Prélèvement AEP ou en ZRE': {severity: 'new', label: 'AEP ou en ZRE'},
  'Prélèvement ICPE hors ZRE': {severity: 'info', label: 'ICPE hors ZRE'},
  'Prélèvement par camion citerne': {severity: 'warning', label: 'Camion citerne'},
  'Autre prélèvement (agricole, domestique...)': {severity: 'success', label: 'Autre'}
}

const PrelevementTypeBadge = ({value}) => {
  const label = labels[value]
  return <Badge noIcon severity={label?.severity}>{label?.label}</Badge>
}

export default PrelevementTypeBadge
