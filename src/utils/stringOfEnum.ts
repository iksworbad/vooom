export const stringOfenumValue = (enumValue: any, value: string) => {
  for (var k in enumValue) if (enumValue[k] == value) return k;
  return null;
}
