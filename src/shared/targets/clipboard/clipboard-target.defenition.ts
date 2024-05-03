import { FormDefenition } from '../../types/form-defenition'
import { TargetType } from '../target-type'
import { ClipboardTargetDto } from './clipboard-target.dto'

type Defenition = FormDefenition<ClipboardTargetDto>

export const clipboardTargetDefenition: Defenition = {
  type: TargetType.CLIPBOARD,
  label: 'Put to clipboard'
}
