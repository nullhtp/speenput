import { Card, CardHeader, Divider, CardBody } from '@nextui-org/react'
import { useRef } from 'react'
import { AppSelect } from './ui/AppSelect'
import { CreateControlFunction, useAppForm } from '../hooks/useAppForm'
import { TargetType } from '../../../../shared/targets/target-type'
import { TargetDto } from '../../../../shared/targets/target.dto'
import { FormBuilder } from './FormBuilder'
import {
  targetDefenitions,
  TargetFormDefenitions
} from '../../../../shared/targets/target.defenitions'

type TargetFormParams = {
  type: TargetType
}

type TargetTypeItems = {
  value: TargetType
  label: string
}

const targetTypeItems: TargetTypeItems[] = targetDefenitions.map((def) => ({
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

  const { onSubmit, createControl, watch } = useAppForm<TargetFormParams, TargetDto>({
    initValues: target,
    onEdit,
    formEl
  })
  const typeWatcher = watch('type')

  const formDefenition = targetDefenitions.find((d) => d.type === typeWatcher)

  return (
    <Card className="max-w">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Target</p>
        </div>
      </CardHeader>
      <Divider />
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
            items={targetTypeItems}
          ></AppSelect>
          <FormBuilder
            createControl={createControl as unknown as CreateControlFunction}
            defenition={formDefenition as unknown as TargetFormDefenitions}
          ></FormBuilder>
        </form>
      </CardBody>
      <Divider />
    </Card>
  )
}
