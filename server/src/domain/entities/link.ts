import { uuidv7 } from 'uuidv7'

export interface LinkProps {
  url: string
  alias: string
  accessCount?: number
  createdAt?: Date
}

export class Link {
  private _id: string
  private props: LinkProps

  constructor(props: LinkProps, id?: string) {
    this._id = id ?? uuidv7()
    this.props = {
      ...props,
      accessCount: props.accessCount ?? 0,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  get id(): string {
    return this._id
  }

  get url(): string {
    return this.props.url
  }

  get alias(): string {
    return this.props.alias
  }

  get accessCount(): number {
    return this.props.accessCount ?? 0
  }

  get createdAt(): Date {
    return this.props.createdAt ?? new Date()
  }

  incrementAccessCount(): void {
    this.props.accessCount = (this.props.accessCount ?? 0) + 1
  }
}
