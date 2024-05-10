import { dialog, MessageBoxOptions } from 'electron'
import { TargetFactory } from '../../types/action-factory'
import { FormDefinition } from '../../types/form-definition'
import { TargetAction } from '../../types/action-step'

export default class Factory extends TargetFactory {
  getFormDefinition(): FormDefinition {
    return {
      type: 'target_base_messagebox',
      label: 'Show in message box'
    }
  }

  fromDto(): Action {
    return new Action()
  }
}

class Action extends TargetAction {
  async execute(text: string): Promise<void> {
    const options: MessageBoxOptions = { message: text, type: 'info' }
    await dialog.showMessageBox(options)
  }
}
