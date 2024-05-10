import { FormDefinition } from '../../types/form-definition'
import { OpenAiTextTransformerDto } from './openai-text-transformer.dto'

type Defenition = FormDefinition<OpenAiTextTransformerDto>

export const openAiTextTransformerDefenition: Defenition = {
  type: 'transform_base_openai_text',
  label: 'Transform data with OpenAI LLM',
  params: {
    apiKey: { fieldType: 'password', label: 'Api key', required: true },
    modelName: {
      fieldType: 'input',
      label: 'Model name',
      required: true,
      defaultValue: 'gpt-3.5-turbo',
      inputMode: 'text'
    },
    temperature: {
      fieldType: 'input',
      label: 'Temperature',
      defaultValue: '0.4',
      inputMode: 'decimal',
      required: true
    },
    humanMessage: {
      fieldType: 'textarea',
      label: 'Human message'
    },
    systemMessage: {
      fieldType: 'textarea',
      label: 'System message'
    }
  }
}
