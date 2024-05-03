import { clipboard } from 'electron'
import { SourceType } from '../source-type'
import { Source } from '../source-base'

export class ClipboardSource extends Source {
  constructor() {
    super(SourceType.CLIPBOARD)
  }

  async getText(): Promise<string> {
    return clipboard.readText('clipboard')
  }
}
