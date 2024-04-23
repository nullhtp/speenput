import { TransformerDto } from '../../../../shared/dtos/transformer.dto'
import { useFieldArray, useForm } from 'react-hook-form'
import { TransformerForm } from './TransformerForm'
import { TransformerType } from '../../../../shared/types/transformer-type'
import { Button } from '@nextui-org/react'
import { useRef } from 'react'

export const TransformerEdit = ({
  transformers,
  onEdit
}: {
  transformers?: TransformerDto[]
  onEdit: (transformers: TransformerDto[]) => void
}): JSX.Element => {
  const formEl = useRef<HTMLFormElement>()

  const { control, handleSubmit } = useForm({
    values: { transformers: transformers ?? [] }
  })
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'transformers'
  })

  const requestWrapper =
    (fn: (...args) => void) =>
    (...args): void => {
      fn(...args)
      formEl.current?.requestSubmit()
    }

  return (
    <form
      ref={formEl as React.RefObject<HTMLFormElement>}
      onSubmit={handleSubmit((data, e) => {
        e?.preventDefault()
        onEdit(data.transformers)
      })}
    >
      {fields.map((field, index) => (
        <TransformerForm
          key={field.id}
          update={requestWrapper(update)}
          remove={requestWrapper(remove)}
          index={index}
          value={field}
        />
      ))}
      <Button
        type="button"
        onClick={requestWrapper(() => {
          append({
            params: {
              apiKey: '',
              humanMessage: '',
              modelName: 'gpt-3.5-turbo',
              systemMessage: '',
              temperature: 0.3
            },
            type: TransformerType.OPENAI_TEXT,
            id: Date.now().toString()
          })
        })}
      >
        Add Transform step
      </Button>
    </form>
  )
}
