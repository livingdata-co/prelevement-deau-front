export function getPointsPrelevementId(dossier) {
  if (dossier.pointPrelevement) {
    return [dossier.pointPrelevement]
  }

  if (dossier.donneesPrelevements) {
    return dossier.donneesPrelevements.flatMap(({pointsPrelevements}) => pointsPrelevements)
  }

  return []
}
