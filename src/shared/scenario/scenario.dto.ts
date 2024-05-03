import { SourceDto } from '../sources/source.dto'
import { TargetDto } from '../targets/target.dto'
import { TransformerDto } from '../transformers/transformer.dto'

export type ScenarioDto = {
  source: SourceDto
  transformers?: TransformerDto[]
  target: TargetDto
  hotkey: string
  name: string
}
