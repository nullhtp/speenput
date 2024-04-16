import { ChatOpenAI } from '@langchain/openai'
import { DataTransformer } from '../domain/data-transformer'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { Runnable } from '@langchain/core/runnables'
import { OpenAiTextTransformerParams } from '../../shared/params/openai-text.transformer'
import { TransformerDto } from '../../shared/dtos/transformer.dto'
import { TransformerType } from '../../shared/types/transformer-type'

export class OpenAiTextTransformer extends DataTransformer {
  private chain: Runnable

  constructor(private readonly params: OpenAiTextTransformerParams) {
    super()
    const model = new ChatOpenAI({
      model: params.modelName,
      temperature: params.temperature,
      apiKey: params.apiKey
    })

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', params.systemMessage],
      ['human', params.humanMessage]
    ])
    const outputParser = new StringOutputParser()

    this.chain = prompt.pipe(model).pipe(outputParser)
  }

  async transform(source: string): Promise<string> {
    const response = await this.chain.invoke({
      data: source
    })

    return response
  }

  toDto(): TransformerDto {
    return {
      type: TransformerType.OPENAI_TEXT,
      params: {
        apiKey: this.params.apiKey,
        humanMessage: this.params.humanMessage,
        modelName: this.params.modelName,
        systemMessage: this.params.systemMessage,
        temperature: this.params.temperature
      }
    }
  }
}
