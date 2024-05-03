import { FormDefenition } from '../../types/form-defenition'
import { SourceType } from '../source-type'
import { InputFieldSourceDto } from './input-field-source.dto'

type Defenition = FormDefenition<InputFieldSourceDto>

export const inputFieldSourceDefenition: Defenition = {
  type: SourceType.INPUT_FIELD,
  label: 'Get data from input'
}
