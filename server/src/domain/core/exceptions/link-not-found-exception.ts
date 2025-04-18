export class LinkNotFoundException extends Error {
  constructor(alias: string) {
    super(`Link with alias "${alias}" not found`)
  }
}