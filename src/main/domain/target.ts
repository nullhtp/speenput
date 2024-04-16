import { TargetDto } from '../../shared/dtos/target.dto'

export abstract class Target {
  abstract write(text: string): Promise<void>
  abstract toDto(): TargetDto
}
