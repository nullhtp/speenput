import { clipboard } from 'electron'
import { TargetFactory } from '../../types/action-factory'
import { FormDefinition } from '../../types/form-definition'
import { TargetAction } from '../../types/action-step'

export default class Factory extends TargetFactory {
  getFormDefinition(): FormDefinition {
    return {
      type: 'target_base_clipboard',
      label: 'Put to clipboard'
    }
  }

  fromDto(): Action {
    return new Action()
  }
}

class Action extends TargetAction {
  async execute(data: string): Promise<void> {
    clipboard.writeText(data)
  }
}
