import { clipboard } from 'electron'
import { Target } from '../target-base'
import { TargetType } from '../target-type'

export class ClipboardTarget extends Target {
  constructor() {
    super(TargetType.CLIPBOARD)
  }

  async write(text: string): Promise<void> {
    clipboard.writeText(text)
  }
}
