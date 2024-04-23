import { ScenarioDto } from '../../../shared/dtos/scenario.dto'
import { LeftMenu } from './components/LeftMenu'
import { ScenarioEdit } from './components/ScenarioEdit'
import { SourceType } from '../../../shared/types/source-type'
import { TargetType } from '../../../shared/types/target-type'
import { TransformerType } from '../../../shared/types/transformer-type'

export const Settings = (): JSX.Element => {
  const scenarios: ScenarioDto[] = [
    {
      hotkey: 'Alt+X',
      name: 'Test scenario',
      source: { type: SourceType.INPUT_FIELD },
      target: { type: TargetType.INPUT_REPLACE },
      transformers: [
        {
          type: TransformerType.OPENAI_TEXT,
          params: {
            apiKey: '',
            humanMessage: 'Only fix grammar in message without extra words: {data}',
            modelName: 'gpt-3.5-turbo-1106',
            systemMessage: 'You are helpful assistent. ',
            temperature: 0.2
          }
        }
      ]
    }
  ]
  return (
    <div className="flex flex-row gap-3">
      <LeftMenu scenarios={scenarios}></LeftMenu>
      <ScenarioEdit scenario={scenarios[0]}></ScenarioEdit>
    </div>
  )
}
