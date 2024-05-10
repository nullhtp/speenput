import { ScenarioDto } from '../../shared/scenario/scenario.dto'
import { Scenario } from './scenario'
import { SourceMapper, TargetMapper, TransformerMapper } from './mappers'
import { SourceFactory, TargetFactory, TransformFactory } from '../../shared/types/action-factory'

export class ScenarioMapper {
  constructor(
    sourceFactories: SourceFactory[],
    targetFactories: TargetFactory[],
    transformersFactories: TransformFactory[]
  ) {
    this.sourceMapper = new SourceMapper(sourceFactories)
    this.targetMapper = new TargetMapper(targetFactories)
    this.transformerMapper = new TransformerMapper(transformersFactories)
  }

  private sourceMapper: SourceMapper
  private targetMapper: TargetMapper
  private transformerMapper: TransformerMapper

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
