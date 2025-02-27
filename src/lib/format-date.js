import {format} from 'date-fns'
import {fr} from 'date-fns/locale'

function formatDate(date) {
  if (!date) {
    return null
  }

  return format(date, 'dd/MM/yyyy')
}

export function formatPeriodeDate(date) {
  if (!date) {
    return null
  }

  return format(date, 'd MMMM', {locale: fr})
}

export default formatDate
