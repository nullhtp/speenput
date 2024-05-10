import { OpenAiTextTransformerParams } from './openai-text-transformer.params'

export type OpenAiTextTransformerDto = {
  id: string
  type: string
  params: OpenAiTextTransformerParams
}
