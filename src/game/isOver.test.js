import isOver from './isOver'

describe('isOver()', () => {
  test('it is a function', () => {
    expect(typeof isOver).toBe('function')
  })

  test('it returns false when any cards are not revealed', () => {
    const cards = [
      { isRevealed: true },
      { isRevealed: false }
    ]

    expect(isOver(cards)).toBe(false)
  })

  test('it returns true when all cards are revealed', () => {
    const cards = [
      { isRevealed: true },
      { isRevealed: true }
    ]

    expect(isOver(cards)).toBe(true)
  })
})
