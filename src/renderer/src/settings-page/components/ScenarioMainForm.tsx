import { Card, CardBody } from '@nextui-org/react'
import { ScenarioDto } from '../../../../shared/dtos/scenario.dto'
import { useForm } from 'react-hook-form'
import { AppInput } from './ui/AppInput'
import { useEffect, useRef } from 'react'

type ScenarioMainParams = Pick<ScenarioDto, 'hotkey' | 'name'>

export const ScenarioMainForm = ({
  scenario,
  onEdit
}: {
  scenario: ScenarioMainParams
  onEdit: (data: ScenarioMainParams) => void
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,

    formState: { isValid, isDirty, errors }
  } = useForm<ScenarioMainParams>({
    values: {
      name: scenario.name,
      hotkey: scenario.hotkey
    },
    mode: 'all'
  })

  const formEl = useRef<HTMLFormElement>()
  const onValueChange = async (): Promise<void> => {
    formEl.current?.requestSubmit()
  }

  const onSubmit = (data: ScenarioMainParams): void => {
    if (isDirty && isValid) {
      onEdit(data)
      reset(data)
    }
  }

  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full">
        <CardBody className="overflow-hidden">
          <form ref={formEl} className="flex flex-row gap-3" onSubmit={handleSubmit(onSubmit)}>
            <AppInput
              label="Scenario name"
              name="name"
              isRequired
              minLength={4}
              register={register}
              errors={errors}
              onBlur={onValueChange}
            />
            <AppInput
              label="Enter hotkey"
              name="hotkey"
              isRequired
              register={register}
              errors={errors}
              onBlur={onValueChange}
            />
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
