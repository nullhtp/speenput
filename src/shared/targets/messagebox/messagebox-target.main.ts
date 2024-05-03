import { dialog, MessageBoxOptions } from 'electron'
import { Target } from '../target-base'
import { TargetType } from '../target-type'

export class MessageBoxTarget extends Target {
  constructor() {
    super(TargetType.MESSAGE_BOX)
  }

  async write(text: string): Promise<void> {
    const options: MessageBoxOptions = { message: text, type: 'info' }
    await dialog.showMessageBox(options)
  }
}
