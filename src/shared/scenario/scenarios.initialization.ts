import { Scenario } from './scenario'
import { SpeechSource } from '../sources/speech/speech-source.main'
import { InputAppendTarget } from '../targets/input-append/input-append-target.main'
import { InputFieldSource } from '../sources/input-field/input-field-source.main'
import { OpenAiTextTransformer } from '../transformers/openai-text/openai-text-transformer.main'

export const initScenarios: Scenario[] = [
  new Scenario({
    hotkey: 'Alt+Z',
    name: 'Speech to Input',
    source: new SpeechSource({
      apiKey: '???',
      maxDelay: 10_000
    }),
    target: new InputAppendTarget()
  }),
  new Scenario({
    hotkey: 'Alt+X',
    name: 'Grammar fixer',
    source: new InputFieldSource(),
    transformers: [
      new OpenAiTextTransformer('1', {
        apiKey: '???',
        humanMessage: '{data}',
        systemMessage:
          'You are helpful assistent. I should only fix grammar in human message without extra words',
        modelName: 'gpt-3.5-turbo-1106',
        temperature: 0.2
      })
    ],
    target: new InputAppendTarget()
  })
]
