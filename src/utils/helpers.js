export function setItem(key, value) {
  localStorage.setItem(key, value)
}

export function getItem(key) {
  try {
    const item = localStorage.getItem(key)
    return JSON.parse(item)
  } catch {
    return null
  }
}

export function removeItem(key) {
  localStorage.removeItem(key)
}
