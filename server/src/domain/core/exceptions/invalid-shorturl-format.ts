import { ALIAS } from '../constants'

export class InvalidShortUrlException extends Error {
  constructor() {
    super(
      `Invalid short URL format. Use only alphanumeric characters and hyphens, with a length between ${ALIAS.min_length} and ${ALIAS.max_length} characters.`
    )
  }
}
