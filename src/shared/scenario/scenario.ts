import { ScenarioDto } from './scenario.dto'
import { Source } from '../sources/source-base'
import { Target } from '../targets/target-base'
import { DataTransformer } from '../transformers/transformer-base'
import uuid from 'uuid'

type ScenarioProps = {
  source: Source
  transformers?: DataTransformer[]
  target: Target
} & Omit<ScenarioDto, 'source' | 'transformers' | 'target'>

export class Scenario {
  private id: string
  private source: Source
  private target: Target

  private hotkey: string
  private name: string

  private transformers: DataTransformer[]

  constructor({ source, target, transformers, hotkey, name, id }: ScenarioProps) {
    this.id = id ?? uuid.v4()
    this.source = source
    this.target = target
    this.transformers = transformers ?? []
    this.hotkey = hotkey
    this.name = name
  }

  async execute(): Promise<void> {
    let data = await this.source.getText()

    for (const transformer of this.transformers) {
      data = await transformer.transform(data)
    }
    await this.target.write(data)
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
