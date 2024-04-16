import { clipboard, Key, keyboard } from '@nut-tree/nut-js'
import { Target } from '../domain/target'
import { TargetDto } from '../../shared/dtos/target.dto'
import { TargetType } from '../../shared/types/target-type'

export class InputReplaceTarget extends Target {
  async write(text: string): Promise<void> {
    const oldContent = await clipboard.getContent()

    await clipboard.setContent(text)

    keyboard.config = { autoDelayMs: 50 }

    await keyboard.pressKey(Key.LeftControl, Key.A)
    await keyboard.releaseKey(Key.LeftControl, Key.A)

    await keyboard.pressKey(Key.LeftControl, Key.V)
    await keyboard.releaseKey(Key.LeftControl, Key.V)

    await clipboard.setContent(oldContent)
  }

  toDto(): TargetDto {
    return {
      type: TargetType.INPUT_REPLACE
    }
  }
}
