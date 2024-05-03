import { clipboard, Key, keyboard } from '@nut-tree/nut-js'
import { Target } from '../target-base'
import { TargetType } from '../target-type'

export class InputAppendTarget extends Target {
  constructor() {
    super(TargetType.INPUT_APPEND)
  }

  async write(text: string): Promise<void> {
    const oldContent = await clipboard.getContent()

    keyboard.config = { autoDelayMs: 50 }

    await clipboard.setContent(text)

    await keyboard.pressKey(Key.LeftControl, Key.V)
    await keyboard.releaseKey(Key.LeftControl, Key.V)

    await clipboard.setContent(oldContent)
  }
}
