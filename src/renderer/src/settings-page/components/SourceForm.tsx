import { Card, CardHeader, CardBody } from '@nextui-org/react'
import { useRef } from 'react'
import { AppSelect } from './ui/AppSelect'
import { CreateControlFunction, useAppForm } from '../hooks/useAppForm'
import { FormBuilder } from './FormBuilder'
import { BaseDto } from '../../../../shared/types/base.dto'
import { FormDefinition } from '../../../../shared/types/form-definition'

export const SourceForm = ({
  source,
  definitions,
  onEdit
}: {
  definitions: FormDefinition[]
  source: BaseDto
  onEdit: (source: BaseDto) => void
}): JSX.Element => {
  const formEl = useRef<HTMLFormElement>()
  const sourceTypeItems = definitions.map((def) => ({
    value: def.type,
    label: def.label
  }))

  const { onSubmit, createControl, watch } = useAppForm<BaseDto>({
    initValues: source,
    onEdit,
    formEl
  })

  const typeWatcher = watch('type')

  const formDefinition = definitions.find((d) => d.type === typeWatcher)

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
            defenition={formDefinition}
          ></FormBuilder>
        </form>
      </CardBody>
    </Card>
  )
}
