import { ScenarioDto } from './scenario.dto'
import { Scenario } from './scenario'
import { SourceMapper } from '../sources/source.mapper'
import { TargetMapper } from '../targets/target.mapper'
import { TransformerMapper } from '../transformers/transformer.mapper'

export class ScenarioMapper {
  private sourceMapper = new SourceMapper()
  private targetMapper = new TargetMapper()
  private transformerMapper = new TransformerMapper()

  fromDto(dto: ScenarioDto): Scenario {
    const source = this.sourceMapper.fromDto(dto.source)
    const target = this.targetMapper.fromDto(dto.target)
    const transformers = dto.transformers?.map((transformerDto) =>
      this.transformerMapper.fromDto(transformerDto)
    )

    return new Scenario({
      id: dto.id,
      hotkey: dto.hotkey,
      name: dto.name,
      source,
      target,
      transformers
    })
  }
}
