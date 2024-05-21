import { Card, CardHeader, CardBody, Button } from '@nextui-org/react'
import { AppSelect } from './ui/AppSelect'
import { CreateControlFunction, useAppForm } from '../hooks/useAppForm'
import { UseFieldArrayRemove, UseFieldArrayUpdate } from 'react-hook-form'

import { FormBuilder } from './FormBuilder'
import { DeleteIcon } from '@renderer/icons/DeleteIcon'
import { BaseDto } from '@shared/types/base.dto'
import { FormDefinition } from '@shared/types/form-definition'

export const TransformerForm = ({
  update,
  remove,
  index,
  definitions,
  value
}: {
  value: BaseDto
  definitions: FormDefinition[]

  index: number
  update: UseFieldArrayUpdate<{ transformers: BaseDto[] }, 'transformers'>
  remove: UseFieldArrayRemove
}): JSX.Element => {
  const { createControl, watch, getValues } = useAppForm<BaseDto>({
    initValues: value,
    onEdit: (data) => {
      return update(index, data)
    }
  })

  const transformerTypeItems = definitions.map((def) => ({
    value: def.type,
    label: def.label
  }))

  const typeWatcher = watch('type')
  const formDefenition = definitions.find((d) => d.type === typeWatcher)

  return (
    <Card className="max-w flex-none">
      <CardHeader className="flex justify-between">
        <p className="text-md">Transform</p>
        <Button
          isIconOnly
          color="danger"
          variant="light"
          onClick={() => {
            remove(index)
          }}
        >
          <DeleteIcon />
        </Button>
      </CardHeader>
      <CardBody className="flex flex-col gap-3">
        <AppSelect
          {...createControl({
            name: 'type',
            label: 'Transformer type'
          })}
          onBlur={() => setTimeout(() => update(index, getValues()), 20)}
          selectedKeys={[typeWatcher]}
          isRequired
          items={transformerTypeItems}
        ></AppSelect>
        <FormBuilder
          createControl={createControl as unknown as CreateControlFunction}
          defenition={formDefenition}
        ></FormBuilder>
      </CardBody>
    </Card>
  )
}
