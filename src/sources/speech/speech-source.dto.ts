import { SourceType } from '../source-type'
import { SpeechSourceParams } from './speech-source.params'

export type SpeechSourceDto = {
  type: SourceType.SPEECH
  params: SpeechSourceParams
}
