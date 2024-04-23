import { FieldErrors, FieldValues, useForm, UseFormRegister } from 'react-hook-form'

type AppFormParams<FormParams, EntityParams> = {
  initValues: FormParams
  onEdit: (params: FormParams) => EntityParams
  formEl: React.MutableRefObject<HTMLFormElement | undefined>
}

export const useAppForm = <FormParams extends FieldValues, EntityParams>({
  initValues,
  onEdit,
  formEl
}: AppFormParams<FormParams, EntityParams>) => {
  const formProps = useForm<FormParams>({
    values: initValues,
    mode: 'all'
  })

  const onValueChange = async (): Promise<void> => {
    formEl.current?.requestSubmit()
  }

  const onSubmit = (data: FormParams): void => {
    if (formProps.formState.isDirty && formProps.formState.isValid) {
      onEdit(data)
      formProps.reset(data)
    }
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
