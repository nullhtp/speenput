import { FormDefinition } from '../../types/form-definition'
import { TransformFactory } from '../../types/action-factory'
import { TransformerAction } from '../../types/action-step'
import { VM } from 'vm2'

type Params = {
  code: string
}

type Dto = {
  id: string
  type: string
  params: Params
}

export default class Factory extends TransformFactory {
  getFormDefinition(): FormDefinition<Dto> {
    return {
      type: 'transformer_base_js_transform',
      label: 'Executing js code',
      params: {
        code: {
          fieldType: 'textarea',
          label: 'JS code',
          defaultValue: 'data.trim()'
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
    // Create a new VM instance
    const vm = new VM({
      timeout: 1000, // Timeout to prevent infinite loops
      sandbox: { data } // Optional: Add objects to the sandbox if needed
    })

    // JavaScript code to execute
    const result = vm.run(this.getParams<Params>().code)
    return result
  }
}
