import { clipboard, Key, keyboard } from '@nut-tree/nut-js'
import { Target } from '../domain/target'

export class InputReplaceTarget extends Target {
  async write(text: string): Promise<void> {
    const oldContent = await clipboard.getContent()

    await clipboard.setContent(text)

    keyboard.config = { autoDelayMs: 50 }

    await keyboard.type(Key.LeftControl, Key.A)
    await keyboard.type(Key.LeftControl, Key.V)

    await clipboard.setContent(oldContent)
  }
}
