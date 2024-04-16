import { clipboard, Key, keyboard } from '@nut-tree/nut-js'
import { Target } from '../domain/target'
import { TargetDto } from '../../shared/dtos/target.dto'
import { TargetType } from '../../shared/types/target-type'

export class InputAppendTarget extends Target {
  async write(text: string): Promise<void> {
    const oldContent = await clipboard.getContent()

    keyboard.config = { autoDelayMs: 50 }

    await clipboard.setContent(text)

    await keyboard.pressKey(Key.LeftControl, Key.V)
    await keyboard.releaseKey(Key.LeftControl, Key.V)

    await clipboard.setContent(oldContent)
  }

  toDto(): TargetDto {
    return {
      type: TargetType.INPUT_APPEND
    }
  }
}
