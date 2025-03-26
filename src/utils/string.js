import {deburr} from 'lodash-es'

export function normalizeString(string) {
  return deburr(string?.toLowerCase())
}
