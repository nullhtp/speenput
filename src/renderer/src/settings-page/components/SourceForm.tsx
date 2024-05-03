import { Card, CardHeader, Divider, CardBody } from '@nextui-org/react'
import { SourceDto } from '../../../../sources/source.dto'
import { useRef } from 'react'
import { AppSelect } from './ui/AppSelect'
import { SourceType } from '../../../../sources/source-type'
import { useAppForm } from '../hooks/useAppForm'
import { StaticSourceParams } from '../../../../sources/static/static-source.params'
import { SpeechSourceParams } from '../../../../sources/speech/speech-source.params'
import { AppInput } from './ui/AppInput'

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

  const { onSubmit, createControl, watch } = useAppForm<SourceFormParams, SourceDto>({
    initValues: source,
    onEdit,
    formEl,
    mapToEntity
  })

  const typeWatcher = watch('type')

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
          {typeWatcher === SourceType.STATIC && (
            <AppInput
              {...createControl({
                name: 'type',
                label: 'Static text'
              })}
            />
          )}
          {typeWatcher === SourceType.SPEECH && (
            <>
              <AppInput
                {...createControl({
                  name: 'maxDelay',
                  label: 'Max delay'
                })}
                inputMode="decimal"
                defaultValue="0"
                isRequired
              />
              <AppInput
                {...createControl({
                  name: 'apiKey',
                  label: 'Api key'
                })}
                type="password"
                isRequired
              />
            </>
          )}
        </form>
      </CardBody>
      <Divider />
    </Card>
  )
}
