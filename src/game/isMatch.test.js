import isMatch from './isMatch'

describe('isMatch()', () => {
  test('it is a function', () => {
    expect(typeof isMatch).toBe('function')
  })

  test('it returns true when two cards match', () => {
    const card = { color: 'red', symbol: '#' }
    const otherCard = { color: 'red', symbol: '#' }

    expect(isMatch({ card, otherCard })).toBe(true)
  })

  test('it returns false when two cards have different symbols', () => {
    const card = { color: 'red', symbol: '@' }
    const otherCard = { color: 'red', symbol: '#' }

    expect(isMatch({ card, otherCard })).toBe(false)
  })

  test('it returns false when two cards have different colors', () => {
    const card = { color: 'blue', symbol: '#' }
    const otherCard = { color: 'red', symbol: '#' }

    expect(isMatch({ card, otherCard })).toBe(false)
  })
})
