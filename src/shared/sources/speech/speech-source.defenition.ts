import { FormDefinition } from '../../types/form-definition'
import { SpeechSourceDto } from './speech-source.dto'

type Defenition = FormDefinition<SpeechSourceDto>

export const speechSourceDefenition: Defenition = {
  type: 'source_base_speech_openai',
  label: 'Speech to text input OpenAI',

  params: {
    apiKey: {
      fieldType: 'password',
      label: 'Api key',
      required: true
    },
    maxDelay: {
      fieldType: 'input',
      inputMode: 'decimal',
      defaultValue: '300',
      label: 'Max delay'
    }
  }
}
