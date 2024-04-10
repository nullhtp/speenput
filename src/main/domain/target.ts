export abstract class Target {
  abstract write(text: string): Promise<void>
}
