import { ClipboardTargetDto } from './clipboard/clipboard-target.dto'
import { ConsoleTargetDto } from './console/console-target.dto'
import { InputAppendTargetDto } from './input-append/input-append-target.dto'
import { InputReplaceTargetDto } from './input-replace/input-replace-target.dto'
import { MessageBoxTargetDto } from './messagebox/messagebox-target.dto'

export type TargetDto =
  | ClipboardTargetDto
  | ConsoleTargetDto
  | InputAppendTargetDto
  | InputReplaceTargetDto
  | MessageBoxTargetDto
