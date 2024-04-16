import { TransformerDto } from '../../shared/dtos/transformer.dto'

export abstract class DataTransformer {
  abstract transform(source: string): Promise<string>
  abstract toDto(): TransformerDto
}
