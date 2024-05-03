import { clipboardTargetDefenition } from './clipboard/clipboard-target.defenition'
import { inputAppendTargetDefenition } from './input-append/input-append-target.defenition'
import { inputReplaceTargetDefenition } from './input-replace/input-replace-target.defenition'
import { messageboxTargetDefenition } from './messagebox/messagebox-target.defenition'

export const targetDefenitions = [
  clipboardTargetDefenition,
  inputAppendTargetDefenition,
  inputReplaceTargetDefenition,
  messageboxTargetDefenition
]

export type TargetFormDefenitions = typeof targetDefenitions
