import { TransformerType } from '../transformer-type'
import { OpenAiTextTransformerParams } from './openai-text-transformer.params'

export type OpenAiTextTransformerDto = {
  id: string
  type: TransformerType.OPENAI_TEXT
  params: OpenAiTextTransformerParams
}
