import { clipboard } from 'electron'
import { SourceType } from '../source-type'
import { Source } from '../source-base'

export class SelectionSource extends Source {
  constructor() {
    super(SourceType.SELECTION)
  }

  async getText(): Promise<string> {
    return clipboard.readText('selection')
  }
}
