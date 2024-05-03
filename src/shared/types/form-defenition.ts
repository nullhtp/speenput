import { FieldDefenition } from './field-defenition'
import { TypesWithParams } from './types-with-params'

export type FormDefenition<T extends { type: unknown }> =
  T extends TypesWithParams<T>
    ? {
        type: T['type']
        label: string
        params: Record<keyof T['params'], FieldDefenition>
      }
    : { type: T['type']; label: string }
