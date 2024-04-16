import { clipboard } from 'electron'
import { Source } from '../domain/source'
import { SourceDto } from '../../shared/dtos/source.dto'
import { SourceType } from '../../shared/types/source-type'

export class SelectionSource extends Source {
  async getText(): Promise<string> {
    return clipboard.readText('selection')
  }

  toDto(): SourceDto {
    return {
      type: SourceType.SELECTION
    }
  }
}
