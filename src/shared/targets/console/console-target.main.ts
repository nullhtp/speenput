import { Target } from '../target-base'
import { TargetType } from '../target-type'

export class ConsoleTarget extends Target {
  constructor() {
    super(TargetType.CONSOLE)
  }

  async write(text: string): Promise<void> {
    console.log(text)
  }
}
