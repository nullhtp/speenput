import { AppInput } from './ui/AppInput'
import { FieldDefenition } from '../../../../shared/types/field-defenition'
import { AppTextarea } from './ui/AppTextarea'
import { CreateControlFunction } from '../hooks/useAppForm'

export const ControlBuilder = ({
  name,
  defenition,
  createControl
}: {
  name: string
  defenition: FieldDefenition
  createControl: CreateControlFunction
}): JSX.Element => {
  switch (defenition.fieldType) {
    case 'input':
      return (
        <AppInput
          {...createControl({
            name,
            label: defenition.label
          })}
          inputMode={defenition.inputMode}
          defaultValue={defenition.defaultValue}
          isRequired={defenition.required}
        />
      )
    case 'password':
      return (
        <AppInput
          {...createControl({
            name,
            label: defenition.label
          })}
          type="password"
          defaultValue={defenition.defaultValue}
          isRequired={defenition.required}
        />
      )

    case 'textarea':
      return (
        <AppTextarea
          {...createControl({
            name,
            label: defenition.label
          })}
          inputMode="text"
          defaultValue={defenition.defaultValue}
          isRequired={defenition.required}
        />
      )
  }
}
