import { ScenarioDto } from '../../../../shared/dtos/scenario.dto'
import { SourceForm } from './SourceForm'
import { TargetForm } from './TargetForm'
import { TransformerForm } from './TransformerForm'

export const ScenarioEdit = ({ scenario }: { scenario: ScenarioDto }): JSX.Element => {
  return (
    <>
      <SourceForm source={scenario.source}></SourceForm>
      <TransformerForm transformers={scenario.transformers}></TransformerForm>
      <TargetForm target={scenario.target}></TargetForm>
    </>
  )
}
