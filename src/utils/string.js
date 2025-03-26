import {deburr} from 'lodash-es'

export function normalizeString(string) {
  if (!string) {
    return string
  }

  return deburr(string.toLowerCase())
}
