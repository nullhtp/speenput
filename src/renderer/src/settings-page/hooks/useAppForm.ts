import { FieldErrors, FieldValues, useForm, UseFormRegister } from 'react-hook-form'

type AppFormParams<FormParams, EntityParams> = {
  initValues: FormParams
  onEdit: (params: EntityParams) => void
  formEl: React.MutableRefObject<HTMLFormElement | undefined>
  mapToEntity?: (data: FormParams) => EntityParams
}

const defaultMapper = <T>(data): T => {
  return data as T
}

export const useAppForm = <FormParams extends FieldValues, EntityParams>({
  initValues,
  onEdit,
  formEl,
  mapToEntity
}: AppFormParams<FormParams, EntityParams>) => {
  const formProps = useForm<FormParams>({
    values: initValues,
    mode: 'all'
  })

  mapToEntity ??= defaultMapper

  const onValueChange = async (): Promise<void> => {
    formEl.current?.requestSubmit()
  }

  const onSubmit = (data: FormParams): void => {
    onEdit(mapToEntity(data))
    formProps.reset(data)
  }
  return {
    ...formProps,
    onSubmit: formProps.handleSubmit(onSubmit),
    createControl: createControl({
      register: formProps.register,
      errors: formProps.formState.errors,
      onBlur: onValueChange
    })
  }
}

const createControl =
  ({
    register,
    errors,
    onBlur
  }: {
    register: UseFormRegister<any>
    errors: FieldErrors<object>
    onBlur: () => Promise<void>
  }) =>
  ({ name, label, isRequired }: { name: string; label: string; isRequired: boolean }) => ({
    register,
    onBlur,
    errors,
    name,
    label,
    isRequired
  })
