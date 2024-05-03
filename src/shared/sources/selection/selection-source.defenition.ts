import { FormDefenition } from '../../types/form-defenition'
import { SourceType } from '../source-type'
import { SelectionSourceDto } from './selection-source.dto'

type Defenition = FormDefenition<SelectionSourceDto>

export const selectionSourceDefenition: Defenition = {
  type: SourceType.SELECTION,
  label: 'Get data from selection'
}
