import { clipboard } from 'electron'
import { FormDefinition } from '../../types/form-definition'
import { SourceFactory } from '../../types/action-factory'
import { SourceAction } from '../../types/action-step'

export default class Factory extends SourceFactory {
  getFormDefinition(): FormDefinition {
    return {
      type: 'source_base_selection',
      label: 'Get data from selection'
    }
  }

  fromDto(): Action {
    return new Action()
  }
}

class Action extends SourceAction {
  async execute(): Promise<string> {
    return clipboard.readText('selection')
  }
}
