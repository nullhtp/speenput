import { ScenarioDto } from '../../shared/dtos/scenario.dto'
import { Scenario } from '../domain/scenario'
import { SourceMapper } from '../../shared/sources/source.mapper'
import { TargetMapper } from '../../shared/targets/target.mapper'
import { TransformerMapper } from './transformer.mapper'

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
      hotkey: dto.hotkey,
      name: dto.name,
      source,
      target,
      transformers
    })
  }
}
