import { Target } from '../domain/target'

export class ConsoleTarget extends Target {
  async write(text: string): Promise<void> {
    console.log(text)
  }
}
