import { ChatOpenAI } from '@langchain/openai'
import { DataTransformer } from '../domain/data-transformer'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { Runnable } from '@langchain/core/runnables'

type OpenAiTextTransformerOptions = {
  modelName: string
  temperature: number
  apiKey: string
  humanMessage: string
  systemMessage: string
}

export class OpenAiTextTransformer extends DataTransformer {
  private chain: Runnable

  constructor({
    modelName,
    temperature,
    apiKey,
    humanMessage,
    systemMessage
  }: OpenAiTextTransformerOptions) {
    super()
    const model = new ChatOpenAI({
      model: modelName,
      temperature,
      apiKey
    })

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', systemMessage],
      ['human', humanMessage]
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
