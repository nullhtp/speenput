import {
  FieldErrors,
  FieldValues,
  Path,
  useForm,
  UseFormRegister,
  UseFormReturn
} from 'react-hook-form'

export type CreateControlFunction<T extends FieldValues = FieldValues> = (
  params: CreateControlProps<T>
) => CreateControlResult<T>

type AppFormParams<FormParams, EntityParams> = {
  initValues: FormParams
  onEdit: (params: EntityParams) => void
  formEl?: React.MutableRefObject<HTMLFormElement | undefined>
  mapToEntity?: (data: FormParams) => EntityParams
}

type AppFormResult<FormParams extends FieldValues> = Omit<
  UseFormReturn<FormParams, object, undefined>,
  'onSubmit'
> & {
  onSubmit: (e?: React.BaseSyntheticEvent<object, object, object> | undefined) => Promise<void>
  createControl: (params: CreateControlProps<FormParams>) => CreateControlResult<FormParams>
}

const defaultMapper = <T>(data): T => {
  return data as T
}

export const useAppForm = <FormParams extends FieldValues, EntityParams>({
  initValues,
  onEdit,
  formEl,
  mapToEntity
}: AppFormParams<FormParams, EntityParams>): AppFormResult<FormParams> => {
  const formProps = useForm<FormParams>({
    values: initValues,
    mode: 'all'
  })

  mapToEntity ??= defaultMapper

  const onValueChange = async (): Promise<void> => {
    formEl?.current?.requestSubmit() ?? onSubmit(formProps.getValues())
  }

  const onSubmit = (data: FormParams): void => {
    onEdit(mapToEntity(data))
    formProps.reset(data)
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
