import { clipboard, Key, keyboard, sleep } from '@nut-tree/nut-js'
import { SourceType } from '../source-type'
import { Source } from '../source-base'

export class InputFieldSource extends Source {
  constructor() {
    super(SourceType.INPUT_FIELD)
  }

  async getText(): Promise<string> {
    const oldContent = await clipboard.getContent()

    await keyboard.pressKey(Key.LeftControl, Key.A)
    await keyboard.releaseKey(Key.LeftControl, Key.A)
    await sleep(100)
    await keyboard.pressKey(Key.LeftControl, Key.C)
    await keyboard.releaseKey(Key.LeftControl, Key.C)
    await sleep(100)

    const inputText = await clipboard.getContent()

    await clipboard.setContent(oldContent)

    return inputText
  }
}
