import { SourceType } from './source-type'
import { SourceDto } from './source.dto'

type TypesWithParams<T> = T extends { params: unknown } ? T : never

type SourceParamsTypes = TypesWithParams<SourceDto>['params']

export abstract class Source {
  readonly type: SourceType
  private readonly _params?: SourceParamsTypes

  constructor(type: SourceType, params?: SourceParamsTypes) {
    this.type = type

    this._params = params
  }

  toDto(): SourceDto {
    if (this._params) {
      return {
        type: this.type,
        params: this._params
      } as SourceDto
    }

    return {
      type: this.type
    } as SourceDto
  }
  abstract getText(): Promise<string>
}
