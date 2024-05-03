import { FormDefenition } from '../../types/form-defenition'
import { TargetType } from '../target-type'
import { InputReplaceTargetDto } from './input-replace-target.dto'

type Defenition = FormDefenition<InputReplaceTargetDto>

export const inputReplaceTargetDefenition: Defenition = {
  type: TargetType.INPUT_REPLACE,
  label: 'Replace text in Input field'
}
