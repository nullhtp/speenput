import { SourceType } from '../source-type'
import { Source } from '../source-base'
import { StaticSourceParams } from './static-source.params'

export class StaticSource extends Source {
  constructor(private readonly params: StaticSourceParams) {
    super(SourceType.STATIC, params)
  }

  async getText(): Promise<string> {
    return this.params.text
  }
}
