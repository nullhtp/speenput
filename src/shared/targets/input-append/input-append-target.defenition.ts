import { FormDefenition } from '../../types/form-defenition'
import { TargetType } from '../target-type'
import { InputAppendTargetDto } from './input-append-target.dto'

type Defenition = FormDefenition<InputAppendTargetDto>

export const inputAppendTargetDefenition: Defenition = {
  type: TargetType.INPUT_APPEND,
  label: 'Append to Input field'
}
