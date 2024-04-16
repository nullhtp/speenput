import { TargetDto } from '../../shared/dtos/target.dto'
import { TargetType } from '../../shared/types/target-type'
import { Target } from '../domain/target'

export class ConsoleTarget extends Target {
  async write(text: string): Promise<void> {
    console.log(text)
  }

  toDto(): TargetDto {
    return {
      type: TargetType.CONSOLE
    }
  }
}
