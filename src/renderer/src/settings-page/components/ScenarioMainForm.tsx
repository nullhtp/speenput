import { Card, CardBody } from '@nextui-org/react'
import { ScenarioDto } from '../../../../shared/dtos/scenario.dto'
import { AppInput } from './ui/AppInput'
import { useRef } from 'react'
import { useAppForm } from '../hooks/useAppForm'

type ScenarioMainParams = Pick<ScenarioDto, 'hotkey' | 'name'>

export const ScenarioMainForm = ({
  scenario,
  onEdit
}: {
  scenario: ScenarioMainParams
  onEdit: (data: ScenarioMainParams) => void
}): JSX.Element => {
  const formEl = useRef<HTMLFormElement>()

  const { onSubmit, createControl } = useAppForm({
    initValues: scenario,
    onEdit,
    formEl
  })

  const nameControl = createControl({
    name: 'name',
    label: 'Scenario name'
  })

  const hotkeyControl = createControl({
    name: 'hotkey',
    label: 'Enter hotkey'
  })

  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full">
        <CardBody className="overflow-hidden">
          <form
            ref={formEl as React.RefObject<HTMLFormElement>}
            className="flex flex-row gap-3"
            onSubmit={onSubmit}
          >
            <AppInput {...nameControl} minLength={4} isRequired />
            <AppInput {...hotkeyControl} isRequired />
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
