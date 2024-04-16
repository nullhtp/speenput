import { Source } from '../domain/source'

export class StaticSource extends Source {
  constructor(private text: string) {
    super()
  }

  async getText(): Promise<string> {
    return this.text
  }
}
