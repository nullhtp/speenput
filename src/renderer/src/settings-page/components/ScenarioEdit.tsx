import { ScenarioDto } from '../../../../shared/dtos/scenario.dto'
import { ScenarioMainForm } from './ScenarioMainForm'
import { SourceForm } from './SourceForm'
import { TargetForm } from './TargetForm'
import { TransformerForm } from './TransformerForm'

export const ScenarioEdit = ({
  scenario,
  onChange
}: {
  scenario: ScenarioDto
  onChange: (scenario: ScenarioDto) => void
}): JSX.Element => {
  const onMainEdit = (data): void => {
    onChange({ ...scenario, ...data })
  }

  const onSourceEdit = (source): void => {
    onChange({ ...scenario, source })
  }

  const onTargetEdit = (target): void => {
    onChange({ ...scenario, target })
  }

  return (
    <div className="flex flex-col w-full gap-3 p-6">
      <ScenarioMainForm scenario={scenario} onEdit={onMainEdit}></ScenarioMainForm>
      <SourceForm source={scenario.source} onEdit={onSourceEdit}></SourceForm>
      <TransformerForm transformers={scenario.transformers}></TransformerForm>
      <TargetForm target={scenario.target} onEdit={onTargetEdit}></TargetForm>
    </div>
  )
}
