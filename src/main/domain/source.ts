export abstract class Source {
  abstract getText(): Promise<string>
}
