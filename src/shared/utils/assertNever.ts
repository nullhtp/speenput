// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const assertNever = (_: never): never => {
  throw new Error("Didn't expect to get here")
}
