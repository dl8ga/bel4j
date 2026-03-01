const API_URL = 'http://localhost:8000'

export async function executeQuery(database, query) {
  const response = await fetch(`${API_URL}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ database, query })
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Ошибка запроса')
  }
  
  return response.json() // { nodes: [...], relationships: [...] }
}