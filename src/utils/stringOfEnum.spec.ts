import { stringOfEnumValue } from "./stringOfEnum";

describe('stringOfEnumValue', () => {
  enum TestEnum {
    foo = 'foo',
    bar = 'bar'
  }

  it('returns value if enum cointains value', () => {
    expect(stringOfEnumValue(TestEnum, 'foo')).toEqual('foo')
  })

  it("returns null if enum doesn't cointain value", () => {
    expect(stringOfEnumValue(TestEnum, 'test')).toEqual(null)
  })

})