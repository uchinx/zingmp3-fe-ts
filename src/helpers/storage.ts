const PREFIX = 'UCHIN_'

export function saveObject(key: string, val: any): void {
  localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(val))
}

export function getObject(key: string): any {
  const data = localStorage.getItem(`${PREFIX}${key}`)
  try {
    return JSON.parse(data) || false
  } catch {
    return false
  }
}
