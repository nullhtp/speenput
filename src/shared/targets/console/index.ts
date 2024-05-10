import { TargetFactory } from '../../types/action-factory'
import { TargetAction } from '../../types/action-step'
import { FormDefinition } from '../../types/form-definition'

export default class Factory extends TargetFactory {
  getFormDefinition(): FormDefinition {
    return {
      type: 'target_base_console',
      label: 'Put to console log'
    }
  }

  fromDto(): Action {
    return new Action()
  }
}

class Action extends TargetAction {
  async execute(text: string): Promise<void> {
    console.log(text)
  }
}
