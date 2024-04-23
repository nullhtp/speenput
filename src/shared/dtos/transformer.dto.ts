import { OpenAiTextTransformerParams } from '../params/openai-text.transformer'
import { TransformerType } from '../types/transformer-type'

type OpenAiTextTransformerDto = {
  id: string
  type: TransformerType.OPENAI_TEXT
  params: OpenAiTextTransformerParams
}

export type TransformerDto = OpenAiTextTransformerDto
