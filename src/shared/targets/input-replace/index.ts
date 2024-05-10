import { clipboard, Key, keyboard } from '@nut-tree/nut-js'
import { TargetFactory } from '../../types/action-factory'
import { FormDefinition } from '../../types/form-definition'
import { TargetAction } from '../../types/action-step'

export default class Factory extends TargetFactory {
  getFormDefinition(): FormDefinition {
    return {
      type: 'target_base_input_replace',
      label: 'Replace text in current field'
    }
  }

  fromDto(): Action {
    return new Action()
  }
}

class Action extends TargetAction {
  async execute(text: string): Promise<void> {
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
