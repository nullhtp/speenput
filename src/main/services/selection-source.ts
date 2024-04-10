import { clipboard } from 'electron'
import { Source } from '../domain/source'

export class SelectionSource extends Source {
  async getText(): Promise<string> {
    return clipboard.readText('selection')
  }
}
