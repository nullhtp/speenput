import { Select, SelectItem, SelectProps } from '@nextui-org/react'
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form'

type SelectParams = {
  name: Path<FieldValues>
  items: { label: string; value: string }[]
  errors: FieldErrors<FieldValues>
  isRequired?: boolean
  value?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
} & Omit<SelectProps, 'validate' | 'children'>

export function AppSelect({
  register,
  errors,
  name,
  isRequired,
  onBlur,
  items,
  value,
  ...props
}: SelectParams): JSX.Element {
  return (
    <Select
      {...props}
      placeholder=" "
      selectionMode="single"
      isInvalid={!!errors[name]}
      errorMessage={errors[name]?.message as string}
      {...register(name, {
        onChange: onBlur,
        value,
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
