import { SourceDto } from '../../shared/dtos/source.dto'
import { StaticSourceParams } from '../../shared/params/static-source.params'
import { SourceType } from '../../shared/types/source-type'
import { Source } from '../domain/source'

export class StaticSource extends Source {
  constructor(private params: StaticSourceParams) {
    super()
  }

  async getText(): Promise<string> {
    return this.params.text
  }

  toDto(): SourceDto {
    return {
      type: SourceType.STATIC,
      params: {
        text: this.params.text
      }
    }
  }
}
