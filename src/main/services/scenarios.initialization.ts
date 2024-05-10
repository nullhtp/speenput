import { Scenario } from '../domain/scenario'
// import { v4 } from 'uuid'

export const initScenarios: Scenario[] = [
  // new Scenario({
  //   id: v4(),
  //   hotkey: 'Alt+Z',
  //   name: 'Speech to Input',
  //   source: new SpeechSource({
  //     apiKey: '???',
  //     maxDelay: 10_000
  //   }),
  //   target: new InputAppendTarget()
  // }),
  // new Scenario({
  //   id: v4(),
  //   hotkey: 'Alt+X',
  //   name: 'Grammar fixer',
  //   source: new InputFieldSource(),
  //   transformers: [
  //     new OpenAiTextTransformer('1', {
  //       apiKey: '???',
  //       humanMessage: '{data}',
  //       systemMessage:
  //         'You are helpful assistent. I should only fix grammar in human message without extra words',
  //       modelName: 'gpt-3.5-turbo-1106',
  //       temperature: 0.2
  //     })
  //   ],
  //   target: new InputAppendTarget()
  // })
]
