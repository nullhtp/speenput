import { SourceDto } from './source.dto'
import { TargetDto } from './target.dto'
import { TransformerDto } from './transformer.dto'

export type ScenarioDto = {
  source: SourceDto
  transformers?: TransformerDto[]
  target: TargetDto
  hotkey: string
  name: string
}
