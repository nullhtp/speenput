import { BaseDto } from '../types/base.dto'

export type ScenarioDto = {
  id: string
  source: BaseDto
  transformers?: BaseDto[]
  target: BaseDto
  hotkey: string
  name: string
}
