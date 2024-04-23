import { Input, InputProps } from '@nextui-org/react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

type InputParams = {
  name: string
  errors: FieldErrors<object>
  isRequired?: boolean
  minLength?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
} & InputProps

export const AppInput = ({
  register,
  errors,
  name,
  isRequired,
  minLength,
  onBlur,
  ...props
}: InputParams): JSX.Element => {
  return (
    <Input
      {...props}
      {...register(name, {
        onBlur,
        required: isRequired ? { value: !!isRequired, message: 'Field is required' } : undefined,
        minLength: minLength
          ? { value: minLength, message: `Min characters is ${minLength}` }
          : undefined
      })}
      isInvalid={!!errors[name]}
      placeholder=" "
      errorMessage={errors[name]?.message}
    />
  )
}
