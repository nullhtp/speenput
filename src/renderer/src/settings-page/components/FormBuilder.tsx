import { SourceFormDefenitions } from '../../../../shared/sources/source.defenitions'
import { CreateControlFunction } from '../hooks/useAppForm'
import { FieldDefenition } from '../../../../shared/types/field-defenition'
import { ControlBuilder } from './ControlBuilder'

export const FormBuilder = ({
  defenition,
  createControl
}: {
  defenition?: SourceFormDefenitions
  createControl: CreateControlFunction
}): JSX.Element => {
  if (!defenition) {
    return <></>
  }
  if ('params' in defenition) {
    const params = defenition.params as Record<string, FieldDefenition>
    const fields = Object.entries(params).map(([name, def]) => (
      <ControlBuilder
        name={name}
        createControl={createControl}
        defenition={def}
        key={name}
      ></ControlBuilder>
    ))
    return <>{...fields}</>
  }
  return <></>
}
