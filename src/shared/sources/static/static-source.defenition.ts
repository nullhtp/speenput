import { FormDefenition } from '../../types/form-defenition'
import { SourceType } from '../source-type'
import { StaticSourceDto } from './static-source.dto'

type Defenition = FormDefenition<StaticSourceDto>

export const staticSourceDefenition: Defenition = {
  type: SourceType.STATIC,
  label: 'Static text',
  params: {
    text: { fieldType: 'input', label: 'Static text' }
  }
}
