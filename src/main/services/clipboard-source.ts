import { clipboard } from 'electron'
import { Source } from '../domain/source'

export class ClipboardSource extends Source {
  async getText(): Promise<string> {
    return clipboard.readText('clipboard')
  }
}
