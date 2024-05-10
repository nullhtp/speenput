import { SourceAction, TargetAction, TransformerAction } from '../../shared/types/action-step'
import { ScenarioDto } from '../../shared/scenario/scenario.dto'
import uuid from 'uuid'

type ScenarioProps = {
  source: SourceAction
  transformers?: TransformerAction[]
  target: TargetAction
} & Omit<ScenarioDto, 'source' | 'transformers' | 'target'>

export class Scenario {
  private id: string
  private source: SourceAction
  private target: TargetAction

  private hotkey: string
  private name: string

  private transformers: TransformerAction[]

  constructor({ source, target, transformers, hotkey, name, id }: ScenarioProps) {
    this.id = id ?? uuid.v4()
    this.source = source
    this.target = target
    this.transformers = transformers ?? []
    this.hotkey = hotkey
    this.name = name
  }

  async execute(): Promise<void> {
    let data = await this.source.execute()

    for (const transformer of this.transformers) {
      data = await transformer.execute(data)
    }
    await this.target.execute(data)
  }

  toDto(): ScenarioDto {
    const sourceDto = this.source.toDto()
    const targetDto = this.target.toDto()
    const transformersDtos = this.transformers?.map((transform) => transform.toDto())

    return {
      id: this.id,
      hotkey: this.hotkey,
      name: this.name,
      source: sourceDto,
      target: targetDto,
      transformers: transformersDtos
    }
  }
}
