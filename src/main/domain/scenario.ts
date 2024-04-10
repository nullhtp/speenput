import { DataTransformer } from './data-transformer'
import { Source } from './source'
import { Target } from './target'

type ScenarioProps = {
  source: Source
  transformers?: DataTransformer[]
  target: Target
}

export class Scenario {
  private source: Source
  private target: Target

  private transformers: DataTransformer[]

  constructor({ source, target, transformers }: ScenarioProps) {
    this.source = source
    this.target = target
    this.transformers = transformers ?? []
  }

  async execute(): Promise<void> {
    const data = await this.source.getText()
    const transformedData = this.transformers.reduce(
      (acc, transformer) => transformer.transform(acc),
      data
    )
    await this.target.write(transformedData)
  }
}
