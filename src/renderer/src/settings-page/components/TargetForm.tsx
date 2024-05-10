import { Card, CardHeader, CardBody } from '@nextui-org/react'
import { useRef } from 'react'
import { AppSelect } from './ui/AppSelect'
import { CreateControlFunction, useAppForm } from '../hooks/useAppForm'
import { FormBuilder } from './FormBuilder'
import { FormDefinition } from '@shared/types/form-definition'
import { BaseDto } from '@shared/types/base.dto'

export const TargetForm = ({
  target,
  definitions,
  onEdit
}: {
  definitions: FormDefinition[]
  target: BaseDto
  onEdit: (source: BaseDto) => void
}): JSX.Element => {
  const formEl = useRef<HTMLFormElement>()
  const targetTypeItems = definitions.map((def) => ({
    value: def.type,
    label: def.label
  }))

  const { onSubmit, createControl, watch } = useAppForm<BaseDto>({
    initValues: target,
    onEdit,
    formEl
  })
  const typeWatcher = watch('type')

  const formDefenition = definitions.find((d) => d.type === typeWatcher)

  return (
    <Card className="max-w flex-none">
      <CardHeader>
        <p className="text-md">Target</p>
      </CardHeader>
      <CardBody>
        <form
          ref={formEl as React.RefObject<HTMLFormElement>}
          className="flex flex-col gap-3"
          onSubmit={onSubmit}
        >
          <AppSelect
            {...createControl({
              name: 'type',
              label: 'Target type'
            })}
            isRequired
            selectedKeys={[typeWatcher]}
            items={targetTypeItems}
          ></AppSelect>
          <FormBuilder
            createControl={createControl as unknown as CreateControlFunction}
            defenition={formDefenition}
          ></FormBuilder>
        </form>
      </CardBody>
    </Card>
  )
}
