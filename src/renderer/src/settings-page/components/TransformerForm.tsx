import { Card, CardHeader, CardBody, Button } from '@nextui-org/react'
import { AppSelect } from './ui/AppSelect'
import { CreateControlFunction, useAppForm } from '../hooks/useAppForm'
import { TransformerDto } from '../../../../shared/transformers/transformer.dto'
import { UseFieldArrayRemove, UseFieldArrayUpdate } from 'react-hook-form'
import {
  transformerDefenitions,
  TransformerFormDefenitions
} from '../../../../shared/transformers/transformer.defenitions'
import { FormBuilder } from './FormBuilder'
import { DeleteIcon } from '@renderer/icons/DeleteIcon'

const transformerTypeItems = transformerDefenitions.map((def) => ({
  value: def.type,
  label: def.label
}))

export const TransformerForm = ({
  update,
  remove,
  index,
  value
}: {
  value: TransformerDto
  index: number
  update: UseFieldArrayUpdate<{ transformers: TransformerDto[] }, 'transformers'>
  remove: UseFieldArrayRemove
}): JSX.Element => {
  const {
    createControl,
    watch,
    formState: { isDirty, isValid }
  } = useAppForm<TransformerDto>({
    initValues: value,
    onEdit: (data) => isDirty && isValid && update(index, data)
  })

  const typeWatcher = watch('type')
  const formDefenition = transformerDefenitions.find((d) => d.type === typeWatcher)

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
          selectedKeys={[typeWatcher]}
          isRequired
          items={transformerTypeItems}
        ></AppSelect>
        <FormBuilder
          createControl={createControl as unknown as CreateControlFunction}
          defenition={formDefenition as unknown as TransformerFormDefenitions}
        ></FormBuilder>
      </CardBody>
    </Card>
  )
}
