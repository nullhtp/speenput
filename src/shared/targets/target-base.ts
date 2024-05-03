import { TargetType } from './target-type'
import { TargetDto } from './target.dto'

type TypesWithParams<T> = T extends { params: unknown } ? T : never

type TargetParamsTypes = TypesWithParams<TargetDto>['params']

export abstract class Target {
  readonly type: TargetType
  private readonly _params?: TargetParamsTypes

  constructor(type: TargetType, params?: TargetParamsTypes) {
    this.type = type

    this._params = params
  }

  toDto(): TargetDto {
    if (this._params) {
      return {
        type: this.type,
        params: this._params
      } as TargetDto
    }

    return {
      type: this.type
    } as TargetDto
  }
  abstract write(text: string): Promise<void>
}
