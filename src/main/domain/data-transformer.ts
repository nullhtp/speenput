export abstract class DataTransformer {
  abstract transform(source: string): Promise<string>
}
