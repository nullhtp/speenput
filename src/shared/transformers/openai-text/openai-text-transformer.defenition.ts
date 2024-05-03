import { FormDefenition } from '../../types/form-defenition'
import { TransformerType } from '../transformer-type'
import { OpenAiTextTransformerDto } from './openai-text-transformer.dto'

type Defenition = FormDefenition<OpenAiTextTransformerDto>

export const openAiTextTransformerDefenition: Defenition = {
  type: TransformerType.OPENAI_TEXT,
  label: 'Transform data with LLM',
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
