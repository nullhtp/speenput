import { useState } from 'react'
import { ScenarioDto } from '../../../../shared/scenario/scenario.dto'
import { ScenarioMainForm } from './ScenarioMainForm'
import { SourceForm } from './SourceForm'
import { TargetForm } from './TargetForm'
import { TransformerEdit } from './TransformerEdit'
import { mergeRight, pipe, curry } from 'ramda'

export const ScenarioEdit = ({
  scenario,
  onChange
}: {
  scenario?: ScenarioDto
  onChange: (scenario: ScenarioDto) => void
}): JSX.Element => {
  if (!scenario) {
    return <>Choose or create</>
  }

  const [currentScenario, setCurrentScenario] = useState(scenario)

  const changeScenario = curry(
    pipe(mergeRight, (newScenario: ScenarioDto): void => {
      setCurrentScenario(newScenario)
      onChange(newScenario)
    })
  )

  return (
    <div className="flex flex-col w-full gap-3 p-6">
      <ScenarioMainForm
        scenario={scenario}
        onEdit={changeScenario(currentScenario)}
      ></ScenarioMainForm>
      <SourceForm
        source={scenario.source}
        onEdit={(source) => changeScenario(currentScenario)({ source })}
      ></SourceForm>
      <TransformerEdit
        transformers={scenario.transformers}
        onEdit={(transformers) => changeScenario(currentScenario)({ transformers })}
      ></TransformerEdit>
      <TargetForm
        target={scenario.target}
        onEdit={(target) => changeScenario(currentScenario)({ target })}
      ></TargetForm>
    </div>
  )
}
