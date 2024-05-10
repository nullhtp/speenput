import { BaseDto } from '../../shared/types/base.dto'
import { SourceFactory, TargetFactory, TransformFactory } from '../../shared/types/action-factory'

type AllFactories = SourceFactory | TargetFactory | TransformFactory

type FactoryAction<T extends AllFactories> = ReturnType<T['createInstanceFromDto']>

class Mapper<T extends AllFactories> {
  constructor(private readonly factories: T[]) {}
  fromDto(dto: BaseDto): FactoryAction<T> {
    const type = dto.type

    const factory = this.factories.find((factory) => factory.isThisAction(type))

    if (!factory) {
      throw Error(`Factory for type "${type}" not found`)
    }

    return factory.createInstanceFromDto(dto) as FactoryAction<T>
  }
}

export class SourceMapper extends Mapper<SourceFactory> {}
export class TargetMapper extends Mapper<TargetFactory> {}
export class TransformerMapper extends Mapper<TransformFactory> {}
