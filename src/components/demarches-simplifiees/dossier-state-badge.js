import {Badge} from '@codegouvfr/react-dsfr/Badge'

const labels = {
  accepte: {severity: 'success', label: 'Accepté'},
  refuse: {severity: 'error', label: 'Refusé'},
  en_construction: {severity: null, label: 'En construction'}, // eslint-disable-line camelcase
  en_instruction: {severity: 'info', label: 'En instruction'}, // eslint-disable-line camelcase
  sans_suite: {severity: 'warning', label: 'Sans suite'} // eslint-disable-line camelcase
}

const DossierStateBadge = ({value}) => {
  const label = labels[value]
  return <Badge severity={label?.severity}>{label?.label}</Badge>
}

export default DossierStateBadge
