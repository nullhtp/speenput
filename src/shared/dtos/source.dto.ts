import { SpeechSourceParams } from '../params/speech-source.params'
import { StaticSourceParams } from '../params/static-source.params'
import { SourceType } from '../types/source-type'

type ClipboardSourceDto = {
  type: SourceType.CLIPBOARD
}

type SelectionSourceDto = {
  type: SourceType.SELECTION
}

type InputFieldSourceDto = {
  type: SourceType.INPUT_FIELD
}

type SpeechSourceDto = {
  type: SourceType.SPEECH
  params: SpeechSourceParams
}

type StaticSourceDto = {
  type: SourceType.STATIC
  params: StaticSourceParams
}

export type SourceDto =
  | ClipboardSourceDto
  | SelectionSourceDto
  | StaticSourceDto
  | SpeechSourceDto
  | InputFieldSourceDto
