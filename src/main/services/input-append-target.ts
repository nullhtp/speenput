import { clipboard, Key, keyboard } from '@nut-tree/nut-js'
import { Target } from '../domain/target'

export class InputAppendTarget extends Target {
  async write(text: string): Promise<void> {
    const oldContent = await clipboard.getContent()

    await clipboard.setContent(text)

    await keyboard.pressKey(Key.LeftControl, Key.V)
    await keyboard.releaseKey(Key.LeftControl, Key.V)

    await clipboard.setContent(oldContent)
  }
}
