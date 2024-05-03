import { clipboard, Key, keyboard } from '@nut-tree/nut-js'
import { Target } from '../target-base'
import { TargetType } from '../target-type'

export class InputReplaceTarget extends Target {
  constructor() {
    super(TargetType.INPUT_REPLACE)
  }

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
}
