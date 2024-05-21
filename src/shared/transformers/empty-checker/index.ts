import { FormDefinition } from '../../types/form-definition'
import { TransformFactory } from '../../types/action-factory'
import { TransformerAction } from '../../types/action-step'

type Params = {
  message: string
}

type Dto = {
  id: string
  type: string
  params: Params
}

export default class Factory extends TransformFactory {
  getFormDefinition(): FormDefinition<Dto> {
    return {
      type: 'transformer_base_empty_checker',
      label: 'Throw error if data empty',
      params: {
        message: {
          fieldType: 'input',
          label: 'Displayed message if data from previous step is empty',
          defaultValue: 'Data from previous step is empty'
        }
      }
    }
  }

  fromDto({ id, params }: Dto): Action {
    return new Action(id, params)
  }
}

class Action extends TransformerAction {
  async execute(data: string): Promise<string> {
    if (data) {
      return data
    }

    const message = this.getParams<Params>().message
    throw Error(message)
  }
}
