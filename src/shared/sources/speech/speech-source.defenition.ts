import { FormDefinition } from '../../types/form-definition'
import { SpeechSourceDto } from './speech-source.dto'

type Defenition = FormDefinition<SpeechSourceDto>

export const speechSourceDefenition: Defenition = {
  type: 'source_base_speech_openai',
  label: 'OpenAI speech to text input',

  params: {
    apiKey: {
      fieldType: 'password',
      label: 'Api key',
      required: true
    }
  }
}
