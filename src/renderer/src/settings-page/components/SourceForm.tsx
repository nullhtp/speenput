import { Card, CardHeader, CardBody } from '@nextui-org/react'
import { SourceDto } from '../../../../shared/sources/source.dto'
import { useRef } from 'react'
import { AppSelect } from './ui/AppSelect'
import { CreateControlFunction, useAppForm } from '../hooks/useAppForm'
import {
  sourceDefenitions,
  SourceFormDefenitions
} from '../../../../shared/sources/source.defenitions'
import { FormBuilder } from './FormBuilder'

const sourceTypeItems = sourceDefenitions.map((def) => ({
  value: def.type,
  label: def.label
}))

export const SourceForm = ({
  source,
  onEdit
}: {
  source: SourceDto
  onEdit: (source: SourceDto) => void
}): JSX.Element => {
  const formEl = useRef<HTMLFormElement>()

  const { onSubmit, createControl, watch } = useAppForm<SourceDto>({
    initValues: source,
    onEdit,
    formEl
  })

  const typeWatcher = watch('type')

  const formDefenition = sourceDefenitions.find((d) => d.type === typeWatcher)

  return (
    <Card className="flex-none w-full">
      <CardHeader>
        <p className="text-md">Source</p>
      </CardHeader>
      <CardBody className="overflow-auto">
        <form
          ref={formEl as React.RefObject<HTMLFormElement>}
          className="flex flex-col gap-3"
          onSubmit={onSubmit}
        >
          <AppSelect
            {...createControl({
              name: 'type',
              label: 'Source type'
            })}
            isRequired
            selectedKeys={[typeWatcher]}
            items={sourceTypeItems}
          ></AppSelect>
          <FormBuilder
            createControl={createControl as unknown as CreateControlFunction}
            defenition={formDefenition as unknown as SourceFormDefenitions}
          ></FormBuilder>
        </form>
      </CardBody>
    </Card>
  )
}
