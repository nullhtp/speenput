import { TransformerType } from './transformer-type'
import { TransformerDto } from './transformer.dto'

type TypesWithParams<T> = T extends { params: unknown } ? T : never

type TargetParamsTypes = TypesWithParams<TransformerDto>['params']

export abstract class DataTransformer {
  readonly id: string
  readonly type: TransformerType
  private readonly _params?: TargetParamsTypes

  constructor(id: string, type: TransformerType, params?: TargetParamsTypes) {
    this.id = id
    this.type = type

    this._params = params
  }

  toDto(): TransformerDto {
    if (this._params) {
      return {
        id: this.id,
        type: this.type,
        params: this._params
      } as TransformerDto
    }

    return {
      id: this.id,
      type: this.type
    } as TransformerDto
  }

  abstract transform(source: string): Promise<string>
}
