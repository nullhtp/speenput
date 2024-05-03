import { statSync, writeJSON, ensureFile } from 'fs-extra'
import { Scenario } from '../domain/scenario'
import { InputAppendTarget } from '../targets/input-append-target'
import { OpenAiTextTransformer } from '../transformers/openai-text-transformer'
import { SpeechSource } from '../../shared/sources/speech/speech-source.main'
import { InputFieldSource } from '../../shared/sources/input-field/input-field-source.main'

export class ScenariosInitializer {
  constructor(private filename: string) {}
  async initializeIfNot(): Promise<void> {
    await ensureFile(this.filename)

    const stats = statSync(this.filename)

    if (stats.size > 0) {
      return
    }

    const speechToInputScenarioDto = this.getSpeechToInputScenario().toDto()
    const inputGrammarScenario = this.getInputGrammarScenario().toDto()

    await writeJSON(this.filename, [speechToInputScenarioDto, inputGrammarScenario])
  }

  private getSpeechToInputScenario(): Scenario {
    return new Scenario({
      hotkey: 'Alt+Z',
      name: 'Speech to Input',
      source: new SpeechSource({
        apiKey: '???',
        maxDelay: 10_000
      }),
      target: new InputAppendTarget()
    })
  }

  private getInputGrammarScenario(): Scenario {
    return new Scenario({
      hotkey: 'Alt+X',
      name: 'Grammar fixer',
      source: new InputFieldSource(),
      transformers: [
        new OpenAiTextTransformer({
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
  }
}
