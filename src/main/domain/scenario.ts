import { ScenarioDto } from '../../shared/dtos/scenario.dto'
import { DataTransformer } from './data-transformer'
import { Source } from './source'
import { Target } from './target'

type ScenarioProps = {
  source: Source
  transformers?: DataTransformer[]
  target: Target
} & Omit<ScenarioDto, 'source' | 'transformers' | 'target'>

export class Scenario {
  private source: Source
  private target: Target

  private hotkey: string
  private name: string

  private transformers: DataTransformer[]

  constructor({ source, target, transformers, hotkey, name }: ScenarioProps) {
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
      hotkey: this.hotkey,
      name: this.name,
      source: sourceDto,
      target: targetDto,
      transformers: transformersDtos
    }
  }
}
