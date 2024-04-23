import { Card, CardHeader, Divider, CardBody } from '@nextui-org/react'
import { SourceDto } from '../../../../shared/dtos/source.dto'
import { useRef } from 'react'
import { AppSelect } from './ui/AppSelect'
import { SourceType } from '../../../../shared/types/source-type'
import { useAppForm } from '../hooks/useAppForm'
import { StaticSourceParams } from '../../../../shared/params/static-source.params'
import { SpeechSourceParams } from '../../../../shared/params/speech-source.params'

type SourceFormParams = {
  type: SourceType
} & Partial<StaticSourceParams> &
  Partial<SpeechSourceParams>

type SourceTypeItems = {
  value: SourceType
  label: string
}

const sourceTypeItems: SourceTypeItems[] = [
  { value: SourceType.CLIPBOARD, label: 'Get data from clipboard' },
  { value: SourceType.INPUT_FIELD, label: 'Get data from input' },
  { value: SourceType.SELECTION, label: 'Get data from selection' },
  { value: SourceType.SPEECH, label: 'Speech to text input' },
  { value: SourceType.STATIC, label: 'Static text' }
]

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

  const { onSubmit, createControl } = useAppForm<SourceFormParams, SourceDto>({
    initValues: source,
    onEdit,
    formEl,
    mapToEntity
  })

  const typeControl = createControl({
    name: 'type',
    label: 'Scenario name',
    isRequired: true
  })

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Source</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <form ref={formEl} className="flex flex-row gap-3" onSubmit={onSubmit}>
          <AppSelect {...typeControl} items={sourceTypeItems}></AppSelect>
        </form>
      </CardBody>
      <Divider />
    </Card>
  )
}
