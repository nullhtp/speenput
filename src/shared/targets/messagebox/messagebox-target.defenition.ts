import { FormDefenition } from '../../types/form-defenition'
import { TargetType } from '../target-type'
import { MessageBoxTargetDto } from './messagebox-target.dto'

type Defenition = FormDefenition<MessageBoxTargetDto>

export const messageboxTargetDefenition: Defenition = {
  type: TargetType.MESSAGE_BOX,
  label: 'Show in message box'
}
