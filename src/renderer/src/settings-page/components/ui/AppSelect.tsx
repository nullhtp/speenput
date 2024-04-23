import { Select, SelectItem, SelectProps } from '@nextui-org/react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

type SelectParams = {
  name: string
  items: { label: string; value: string }[]
  errors: FieldErrors<object>
  isRequired?: boolean
  minLength?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
} & SelectProps

export const AppSelect = ({
  register,
  errors,
  name,
  isRequired,
  onBlur,
  items,
  ...props
}: Omit<SelectParams, 'children'>): JSX.Element => {
  return (
    <Select
      {...props}
      className="max-w-xs"
      placeholder=" "
      isInvalid={!!errors[name]}
      errorMessage={errors[name]?.message}
      {...register(name, {
        onChange: onBlur,
        required: isRequired ? { value: !!isRequired, message: 'Field is required' } : undefined
      })}
    >
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  )
}
