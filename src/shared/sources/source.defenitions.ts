import { clipboardSourceDefenition } from './clipboard/clipboard-source.defenition'
import { inputFieldSourceDefenition } from './input-field/input-field-source.defenition'
import { selectionSourceDefenition } from './selection/selection-source.defenition'
import { speechSourceDefenition } from './speech/speech-source.defenition'
import { staticSourceDefenition } from './static/static-source.defenition'

export const sourceDefenitions = [
  clipboardSourceDefenition,
  inputFieldSourceDefenition,
  selectionSourceDefenition,
  speechSourceDefenition,
  staticSourceDefenition
]

export type SourceFormDefenitions = typeof sourceDefenitions
