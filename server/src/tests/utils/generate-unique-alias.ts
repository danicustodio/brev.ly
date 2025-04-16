export function generateUniqueAlias(prefix = 'test') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
}
