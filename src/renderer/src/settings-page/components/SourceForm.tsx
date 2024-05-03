import { Card, CardHeader, Divider, CardBody } from '@nextui-org/react'
import { SourceDto } from '../../../../shared/sources/source.dto'
import { useRef } from 'react'
import { AppSelect } from './ui/AppSelect'
import { SourceType } from '../../../../shared/sources/source-type'
import { CreateControlFunction, useAppForm } from '../hooks/useAppForm'
import { StaticSourceParams } from '../../../../shared/sources/static/static-source.params'
import { SpeechSourceParams } from '../../../../shared/sources/speech/speech-source.params'
import {
  sourceDefenitions,
  SourceFormDefenitions
} from '../../../../shared/sources/source.defenitions'
import { FormBuilder } from './FormBuilder'

type SourceFormParams = {
  type: SourceType
} & Partial<StaticSourceParams> &
  Partial<SpeechSourceParams>

type SourceTypeItems = {
  value: SourceType
  label: string
}

const sourceTypeItems: SourceTypeItems[] = sourceDefenitions.map((def) => ({
  value: def.type,
  label: def.label
}))

const mapToEntity = ({ type, ...params }: SourceFormParams): SourceDto => {
  return { type, params } as SourceDto
}

export const SourceForm = ({
  source,
  onEdit
}: {
  source: SourceDto
  onEdit: (source: SourceDto) => void
}): JSX.Element => {
  const formEl = useRef<HTMLFormElement>()

  const { onSubmit, createControl, watch } = useAppForm<SourceFormParams, SourceDto>({
    initValues: source,
    onEdit,
    formEl,
    mapToEntity
  })

  const typeWatcher = watch('type')

  const formDefenition = sourceDefenitions.find((d) => d.type === typeWatcher)

  return (
    <Card className="max-w">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Source</p>
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
              label: 'Source type'
            })}
            items={sourceTypeItems}
          ></AppSelect>
          <FormBuilder
            createControl={createControl as unknown as CreateControlFunction}
            defenition={formDefenition as unknown as SourceFormDefenitions}
          ></FormBuilder>
        </form>
      </CardBody>
      <Divider />
    </Card>
  )
}
