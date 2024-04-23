import { Input, InputProps } from '@nextui-org/react'
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form'

type InputParams = {
  name: Path<FieldValues>
  errors: FieldErrors<FieldValues>
  isRequired?: boolean
  minLength?: number
  valueAsNumber?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
} & Omit<InputProps, 'validate'>

export function AppInput({
  register,
  errors,
  name,
  isRequired,
  minLength,
  onBlur,
  valueAsNumber,
  ...props
}: InputParams): JSX.Element {
  return (
    <Input
      {...props}
      {...register(name, {
        onBlur,
        required: isRequired ? { value: !!isRequired, message: 'Field is required' } : undefined,
        valueAsNumber,
        minLength: minLength
          ? { value: minLength, message: `Min characters is ${minLength}` }
          : undefined
      })}
      isInvalid={!!errors[name]}
      placeholder=" "
      errorMessage={errors[name]?.message as string}
    />
  )
}
