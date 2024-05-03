export type ToDto<T extends { params?: object; type: string }> = Pick<T, 'params' | 'type'>
