import { useFieldArray, useForm } from 'react-hook-form'
import { TransformerForm } from './TransformerForm'
import { Button } from '@nextui-org/react'
import { useRef } from 'react'
import { BaseDto } from '@shared/types/base.dto'
import { FormDefinition } from '@shared/types/form-definition'
import { v4 } from 'uuid'

export const TransformerEdit = ({
  transformers,
  definitions,
  onEdit
}: {
  definitions: FormDefinition[]

  transformers?: BaseDto[]
  onEdit: (transformers: BaseDto[]) => void
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
      className="flex flex-col gap-3"
      ref={formEl as React.RefObject<HTMLFormElement>}
      onSubmit={handleSubmit((data, e) => {
        e?.preventDefault()
        onEdit(data.transformers)
      })}
    >
      {fields.map((field, index) => (
        <TransformerForm
          definitions={definitions}
          key={field.id}
          update={requestWrapper(update)}
          remove={requestWrapper(remove)}
          index={index}
          value={field}
        />
      ))}
      <Button
        className="max-w-64 self-center"
        type="button"
        color="success"
        variant="bordered"
        onClick={requestWrapper(() => {
          append({
            params: {
              apiKey: '',
              humanMessage: '',
              modelName: 'gpt-3.5-turbo',
              systemMessage: '',
              temperature: 0.3
            },
            type: definitions[0].type,
            id: v4()
          })
        })}
      >
        Add transformation step
      </Button>
    </form>
  )
}
