import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { Runnable } from '@langchain/core/runnables'
import { OpenAiTextTransformerParams } from './openai-text-transformer.params'
import { TransformerType } from '../transformer-type'
import { DataTransformer } from '../transformer-base'

export class OpenAiTextTransformer extends DataTransformer {
  private chain?: Runnable

  constructor(
    id: string,
    private params: OpenAiTextTransformerParams
  ) {
    super(id, TransformerType.OPENAI_TEXT, params)
  }

  getChain(): Runnable {
    if (this.chain) {
      return this.chain
    }
    const model = new ChatOpenAI({
      model: this.params.modelName,
      temperature: this.params.temperature,
      apiKey: this.params.apiKey
    })

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', this.params.systemMessage],
      ['human', this.params.humanMessage]
    ])
    const outputParser = new StringOutputParser()

    this.chain = prompt.pipe(model).pipe(outputParser)

    return this.chain
  }

  async transform(source: string): Promise<string> {
    const chain = this.getChain()
    const response = await chain.invoke({
      data: source
    })

    return response
  }
}
