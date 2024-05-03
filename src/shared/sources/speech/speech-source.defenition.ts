import { FormDefenition } from '../../types/form-defenition'
import { SourceType } from '../source-type'
import { SpeechSourceDto } from './speech-source.dto'

type Defenition = FormDefenition<SpeechSourceDto>

export const speechSourceDefenition: Defenition = {
  type: SourceType.SPEECH,
  label: 'Speech to text input',

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
