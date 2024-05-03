import { ClipboardSourceDto } from './clipboard/clipboard-source.dto'
import { InputFieldSourceDto } from './input-field/input-field-source.dto'
import { SelectionSourceDto } from './selection/selection-source.dto'
import { SpeechSourceDto } from './speech/speech-source.dto'
import { StaticSourceDto } from './static/static-source.dto'

export type SourceDto =
  | ClipboardSourceDto
  | SelectionSourceDto
  | StaticSourceDto
  | SpeechSourceDto
  | InputFieldSourceDto
