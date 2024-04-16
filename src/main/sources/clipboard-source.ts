import { clipboard } from 'electron'
import { Source } from '../../main/domain/source'
import { SourceDto } from '../../shared/dtos/source.dto'
import { SourceType } from '../../shared/types/source-type'

export class ClipboardSource extends Source {
  async getText(): Promise<string> {
    return clipboard.readText('clipboard')
  }

  toDto(): SourceDto {
    return {
      type: SourceType.CLIPBOARD
    }
  }
}
