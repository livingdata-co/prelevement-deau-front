const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getPointsPrelevement() {
  const response = await fetch(`${API_URL}/api/points-prelevement`)
  const dossiers = await response.json()
  return dossiers
}
