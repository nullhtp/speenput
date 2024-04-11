import { clipboard, Key, keyboard } from '@nut-tree/nut-js'
import { Target } from '../domain/target'

export class InputAppendTarget extends Target {
  async write(text: string): Promise<void> {
    const oldContent = await clipboard.getContent()

    keyboard.config = { autoDelayMs: 50 }

    await clipboard.setContent(text)

    await keyboard.type(Key.LeftControl, Key.V)

    await clipboard.setContent(oldContent)
  }
}
