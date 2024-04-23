import { Card, CardHeader, Divider, CardBody } from '@nextui-org/react'
import { useRef } from 'react'
import { AppSelect } from './ui/AppSelect'
import { useAppForm } from '../hooks/useAppForm'
import { TargetDto } from '../../../../shared/dtos/target.dto'
import { TargetType } from '../../../../shared/types/target-type'

type TargetFormParams = {
  type: TargetType
}

type TargetTypeItems = {
  value: TargetType
  label: string
}

const targetTypeItems: TargetTypeItems[] = [
  { value: TargetType.CLIPBOARD, label: 'Put to clipboard' },
  { value: TargetType.INPUT_APPEND, label: 'Append to Input field' },
  { value: TargetType.INPUT_REPLACE, label: 'Replace text in Input field' },
  { value: TargetType.MESSAGE_BOX, label: 'Show in message box' }
]

export const TargetForm = ({
  target,
  onEdit
}: {
  target: TargetDto
  onEdit: (source: TargetDto) => void
}): JSX.Element => {
  const formEl = useRef<HTMLFormElement>()

  const { onSubmit, createControl } = useAppForm<TargetFormParams, TargetDto>({
    initValues: target,
    onEdit,
    formEl
  })

  return (
    <Card className="max-w-[400px]">
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
        </form>
      </CardBody>
      <Divider />
    </Card>
  )
}
