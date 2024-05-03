import { Card, CardHeader, Divider, CardBody, Button } from '@nextui-org/react'
import { AppSelect } from './ui/AppSelect'
import { useAppForm } from '../hooks/useAppForm'
import { AppInput } from './ui/AppInput'
import { TransformerDto } from '../../../../shared/transformers/transformer.dto'
import { TransformerType } from '../../../../shared/transformers/transformer-type'
import { OpenAiTextTransformerParams } from '../../../../shared/transformers/openai-text/openai-text-transformer.params'
import { UseFieldArrayRemove, UseFieldArrayUpdate } from 'react-hook-form'
import { AppTextarea } from './ui/AppTextarea'

type TransformerFormParams = {
  type: TransformerType
} & Partial<OpenAiTextTransformerParams>

type TransformerTypeItems = {
  value: TransformerType
  label: string
}

const transformerTypeItems: TransformerTypeItems[] = [
  { value: TransformerType.OPENAI_TEXT, label: 'Get data from clipboard' }
]

const mapToEntity = ({ type, ...params }: TransformerFormParams): TransformerDto => {
  return { type, params } as TransformerDto
}

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
  } = useAppForm<TransformerFormParams, TransformerDto>({
    initValues: { type: value.type, ...value.params },
    onEdit: (data) => isDirty && isValid && update(index, data),
    mapToEntity
  })

  const typeWatcher = watch('type')

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
          isRequired
          items={transformerTypeItems}
        ></AppSelect>
        {typeWatcher === TransformerType.OPENAI_TEXT && (
          <>
            <AppInput
              {...createControl({
                name: 'modelName',
                label: 'Model name'
              })}
              inputMode="text"
              defaultValue="gpt-3.5-turbo"
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
            <AppInput
              {...createControl({
                name: 'temperature',
                label: 'Temperature'
              })}
              inputMode="decimal"
              defaultValue="0.3"
              isRequired
            />
            <AppTextarea
              {...createControl({
                name: 'systemMessage',
                label: 'System message'
              })}
              inputMode="text"
            />
            <AppTextarea
              {...createControl({
                name: 'humanMessage',
                label: 'Human message'
              })}
              inputMode="text"
            />
          </>
        )}
      </CardBody>
      <Divider />
    </Card>
  )
}
