import { SourceDto } from '../../shared/dtos/source.dto'

export abstract class Source {
  abstract getText(): Promise<string>
  abstract toDto(): SourceDto
}
