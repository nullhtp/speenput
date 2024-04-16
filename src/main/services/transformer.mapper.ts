import { assertNever } from '../../shared/utils/assertNever'
import { TransformerDto } from '../../shared/dtos/transformer.dto'
import { DataTransformer } from '../domain/data-transformer'
import { TransformerType } from '../../shared/types/transformer-type'
import { OpenAiTextTransformer } from '../transformers/openai-text-transformer'

export class TransformerMapper {
  fromDto(dto: TransformerDto): DataTransformer {
    const type = dto.type
    switch (type) {
      case TransformerType.OPENAI_TEXT:
        return new OpenAiTextTransformer(dto.params)
    }
    assertNever(type)
  }
}
