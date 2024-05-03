import { ScenarioDto } from '../../../shared/dtos/scenario.dto'
import { LeftMenu } from './components/LeftMenu'
import { ScenarioEdit } from './components/ScenarioEdit'
import { SourceType } from '../../../shared/sources/source-type'
import { TargetType } from '../../../shared/targets/target-type'
import { TransformerType } from '../../../shared/types/transformer-type'
import { useState } from 'react'

export const Settings = (): JSX.Element => {
  const [scenarios, setScenarios] = useState<ScenarioDto[]>([
    {
      hotkey: 'Alt+X',
      name: 'Test scenario',
      source: { type: SourceType.INPUT_FIELD },
      target: { type: TargetType.INPUT_REPLACE },
      transformers: [
        {
          id: '1',
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
  ])

  const onChange = (scenario: ScenarioDto): void => {
    setScenarios([scenario])
  }

  return (
    <div className="flex flex-row gap-3">
      <LeftMenu scenarios={scenarios}></LeftMenu>
      <ScenarioEdit scenario={scenarios[0]} onChange={onChange}></ScenarioEdit>
    </div>
  )
}
