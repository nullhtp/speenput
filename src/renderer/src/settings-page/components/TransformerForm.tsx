import { Card, CardHeader, Divider, CardBody, Button } from '@nextui-org/react'
import { AppSelect } from './ui/AppSelect'
import { CreateControlFunction, useAppForm } from '../hooks/useAppForm'
import { TransformerDto } from '../../../../shared/transformers/transformer.dto'
import { UseFieldArrayRemove, UseFieldArrayUpdate } from 'react-hook-form'
import {
  transformerDefenitions,
  TransformerFormDefenitions
} from '../../../../shared/transformers/transformer.defenitions'
import { FormBuilder } from './FormBuilder'

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
    <Card className="max-w">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Transform</p>
          <Button
            onClick={() => {
              remove(index)
            }}
          >
            delete
          </Button>
        </div>
      </CardHeader>
      <Divider />
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
      <Divider />
    </Card>
  )
}
