import { clipboard } from 'electron'
import { Target } from '../domain/target'
import { TargetDto } from '../../shared/dtos/target.dto'
import { TargetType } from '../../shared/types/target-type'

export class ClipboardTarget extends Target {
  async write(text: string): Promise<void> {
    clipboard.writeText(text)
  }

  toDto(): TargetDto {
    return {
      type: TargetType.CLIPBOARD
    }
  }
}
