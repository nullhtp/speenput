import { Target } from '../domain/target'
import { dialog, MessageBoxOptions } from 'electron'

export class MessageBoxTarget extends Target {
  async write(text: string): Promise<void> {
    const options: MessageBoxOptions = { message: text, type: 'info' }
    await dialog.showMessageBox(options)
  }
}
