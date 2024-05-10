import { CreateControlFunction } from '../hooks/useAppForm'
import { FieldDefinition } from '@shared/types/field-definition'
import { ControlBuilder } from './ControlBuilder'
import { FormDefinition } from '@shared/types/form-definition'

export const FormBuilder = ({
  defenition,
  createControl
}: {
  defenition?: FormDefinition
  createControl: CreateControlFunction
}): JSX.Element => {
  if (!defenition) {
    return <></>
  }
  if ('params' in defenition) {
    const params = defenition.params as Record<string, FieldDefinition>
    const fields = Object.entries(params).map(([name, def]) => (
      <ControlBuilder
        name={`params.${name}`}
        createControl={createControl}
        defenition={def}
        key={name}
      ></ControlBuilder>
    ))
    return <>{...fields}</>
  }
  return <></>
}
