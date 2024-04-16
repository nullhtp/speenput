import { clipboard, Key, keyboard, sleep } from '@nut-tree/nut-js'
import { Source } from '../domain/source'
import { SourceDto } from '../../shared/dtos/source.dto'
import { SourceType } from '../../shared/types/source-type'

export class InputFieldSource extends Source {
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

  toDto(): SourceDto {
    return {
      type: SourceType.INPUT_FIELD
    }
  }
}
