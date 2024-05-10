import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { Runnable } from '@langchain/core/runnables'
import { OpenAiTextTransformerParams } from './openai-text-transformer.params'
import { TransformerAction } from '../../types/action-step'
import { TransformFactory } from '../../types/action-factory'
import { FormDefinition } from '../../types/form-definition'
import { openAiTextTransformerDefenition } from './openai-text-transformer.defenition'
import { OpenAiTextTransformerDto } from './openai-text-transformer.dto'

export default class Factory extends TransformFactory {
  getFormDefinition(): FormDefinition<OpenAiTextTransformerDto> {
    return openAiTextTransformerDefenition
  }

  fromDto({ id, params }: OpenAiTextTransformerDto): Action {
    return new Action(id, params)
  }
}

export class Action extends TransformerAction {
  private chain?: Runnable

  getChain(): Runnable {
    if (this.chain) {
      return this.chain
    }
    const params = this.getParams<OpenAiTextTransformerParams>()
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

    return this.chain
  }

  async execute(source: string): Promise<string> {
    const chain = this.getChain()
    const response = await chain.invoke({
      data: source
    })

    return response
  }
}
