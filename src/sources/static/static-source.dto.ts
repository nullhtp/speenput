import { SourceType } from '../source-type'
import { StaticSourceParams } from './static-source.params'

export type StaticSourceDto = {
  type: SourceType.STATIC
  params: StaticSourceParams
}
