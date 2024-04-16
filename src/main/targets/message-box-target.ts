import { TargetDto } from '../../shared/dtos/target.dto'
import { TargetType } from '../../shared/types/target-type'
import { Target } from '../domain/target'
import { dialog, MessageBoxOptions } from 'electron'

export class MessageBoxTarget extends Target {
  async write(text: string): Promise<void> {
    const options: MessageBoxOptions = { message: text, type: 'info' }
    await dialog.showMessageBox(options)
  }

  toDto(): TargetDto {
    return {
      type: TargetType.MESSAGE_BOX
    }
  }
}
