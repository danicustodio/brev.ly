export class DuplicatedShortUrlException extends Error {
  constructor() {
    super('Short URL already exists')
  }
}
