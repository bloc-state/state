export const isPrimitive = (test: any) => {
  return test !== Object(test)
}
