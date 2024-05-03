import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { Runnable } from '@langchain/core/runnables'
import { OpenAiTextTransformerParams } from './openai-text-transformer.params'
import { TransformerType } from '../transformer-type'
import { DataTransformer } from '../transformer-base'

export class OpenAiTextTransformer extends DataTransformer {
  private chain: Runnable

  constructor(id: string, params: OpenAiTextTransformerParams) {
    super(id, TransformerType.OPENAI_TEXT, params)
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
}
