import { ALIAS } from '../constants'

/**
 * Validates if a alias is properly formatted
 * @param alias The alias to validate
 * @returns true if the alias is valid, false otherwise
 */
export function isValidAlias(alias: string): boolean {
  // Only allow alphanumeric characters and hyphens
  const validPattern = /^[a-zA-Z0-9-]+$/

  const validLength =
    alias.length >= ALIAS.min_length && alias.length <= ALIAS.max_length

  return validPattern.test(alias) && validLength
}
