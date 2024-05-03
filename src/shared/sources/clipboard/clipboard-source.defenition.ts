import { FormDefenition } from '../../types/form-defenition'
import { SourceType } from '../source-type'
import { ClipboardSourceDto } from './clipboard-source.dto'

type Defenition = FormDefenition<ClipboardSourceDto>

export const clipboardSourceDefenition: Defenition = {
  type: SourceType.CLIPBOARD,
  label: 'Get data from clipboard'
}
