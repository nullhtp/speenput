import { FormDefinition } from '../../types/form-definition'
import { SourceAction } from '../../types/action-step'
import { SourceFactory } from '../../types/action-factory'

type StaticSourceParams = {
  text: string
}

type StaticSourceDto = {
  type: string
  params: StaticSourceParams
}

export class Factory extends SourceFactory {
  getFormDefinition(): FormDefinition<StaticSourceDto> {
    return {
      type: 'source_base_static_text',
      label: 'Static text',
      params: {
        text: { fieldType: 'input', label: 'Static text' }
      }
    }
  }

  fromDto({ params }: StaticSourceDto): Action {
    return new Action(params)
  }
}

export class Action extends SourceAction {
  async execute(): Promise<string> {
    return this.getParams<StaticSourceParams>().text
  }
}
