import { assertNever } from '../utils/assertNever'
import { TransformerDto } from './transformer.dto'
import { TransformerType } from './transformer-type'
import { OpenAiTextTransformer } from './openai-text/openai-text-transformer.main'
import { DataTransformer } from './transformer-base'

export class TransformerMapper {
  fromDto(dto: TransformerDto): DataTransformer {
    const type = dto.type
    switch (type) {
      case TransformerType.OPENAI_TEXT:
        return new OpenAiTextTransformer(dto.id, dto.params)
    }
    assertNever(type)
  }
}
