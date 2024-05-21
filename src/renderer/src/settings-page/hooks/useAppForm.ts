import {
  FieldErrors,
  FieldValues,
  FormState,
  Path,
  useForm,
  UseFormRegister,
  UseFormReturn
} from 'react-hook-form'

export type CreateControlFunction<T extends FieldValues = FieldValues> = (
  params: CreateControlProps<T>
) => CreateControlResult<T>

type AppFormParams<FormParams> = {
  initValues: FormParams
  onEdit: (params: FormParams, formState: FormState<FieldValues>) => void
  formEl?: React.MutableRefObject<HTMLFormElement | undefined>
}

type AppFormResult<FormParams extends FieldValues> = Omit<
  UseFormReturn<FormParams, object, undefined>,
  'onSubmit'
> & {
  onSubmit: (e?: React.BaseSyntheticEvent<object, object, object> | undefined) => Promise<void>
  createControl: (params: CreateControlProps<FormParams>) => CreateControlResult<FormParams>
}

export const useAppForm = <FormParams extends FieldValues>({
  initValues,
  onEdit,
  formEl
}: AppFormParams<FormParams>): AppFormResult<FormParams> => {
  const formProps = useForm<FormParams>({
    values: initValues,
    mode: 'all'
  })

  const onValueChange = async (): Promise<void> => {
    formEl?.current?.requestSubmit() ?? onSubmit(formProps.getValues())
  }

  const onSubmit = (data: FormParams): void => {
    onEdit(data, formProps.formState)
  }

  return {
    ...formProps,
    onSubmit: formProps.handleSubmit(onSubmit),
    createControl: createControlFn({
      register: formProps.register,
      errors: formProps.formState.errors,
      onBlur: onValueChange
    })
  }
}

type CreateControlInherProps<T extends FieldValues> = {
  register: UseFormRegister<T>
  errors: FieldErrors<object>
  onBlur: () => Promise<void>
}

type CreateControlProps<T extends FieldValues> = {
  name: Path<T>
  label: string
}

type CreateControlResult<T extends FieldValues> = CreateControlProps<T> & CreateControlInherProps<T>

const createControlFn =
  <T extends FieldValues>({ register, errors, onBlur }: CreateControlInherProps<T>) =>
  ({ name, label }: CreateControlProps<T>): CreateControlResult<T> => ({
    register,
    onBlur,
    errors,
    name,
    label
  })
