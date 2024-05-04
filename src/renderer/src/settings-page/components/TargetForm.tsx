import { Card, CardHeader, CardBody } from '@nextui-org/react'
import { useRef } from 'react'
import { AppSelect } from './ui/AppSelect'
import { CreateControlFunction, useAppForm } from '../hooks/useAppForm'
import { TargetDto } from '../../../../shared/targets/target.dto'
import { FormBuilder } from './FormBuilder'
import {
  targetDefenitions,
  TargetFormDefenitions
} from '../../../../shared/targets/target.defenitions'

const targetTypeItems = targetDefenitions.map((def) => ({
  value: def.type,
  label: def.label
}))

export const TargetForm = ({
  target,
  onEdit
}: {
  target: TargetDto
  onEdit: (source: TargetDto) => void
}): JSX.Element => {
  const formEl = useRef<HTMLFormElement>()

  const { onSubmit, createControl, watch } = useAppForm<TargetDto>({
    initValues: target,
    onEdit,
    formEl
  })
  const typeWatcher = watch('type')

  const formDefenition = targetDefenitions.find((d) => d.type === typeWatcher)

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
            defenition={formDefenition as unknown as TargetFormDefenitions}
          ></FormBuilder>
        </form>
      </CardBody>
    </Card>
  )
}
