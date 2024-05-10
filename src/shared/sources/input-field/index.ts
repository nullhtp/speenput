import { clipboard, Key, keyboard, sleep } from '@nut-tree/nut-js'
import { FormDefinition } from '../../types/form-definition'
import { SourceFactory } from '../../types/action-factory'
import { SourceAction } from '../../types/action-step'

export default class Factory extends SourceFactory {
  getFormDefinition(): FormDefinition {
    return {
      type: 'source_base_input_field',
      label: 'Get data from input'
    }
  }

  fromDto(): Action {
    return new Action()
  }
}

class Action extends SourceAction {
  async execute(): Promise<string> {
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
