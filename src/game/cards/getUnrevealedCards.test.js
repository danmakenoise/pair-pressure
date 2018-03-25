import getUnrevealedCards from './getUnrevealedCards'

describe('getUnrevealedCards()', () => {
  test('it is a function', () => {
    expect(typeof getUnrevealedCards).toBe('function')
  })

  describe('with valid data', () => {
    const cards = [
      { isRevealed: false },
      { isRevealed: true },
      { isRevealed: false }
    ]

    const result = getUnrevealedCards(cards)

    test('it returns an array', () => {
      expect(result instanceof Array).toBe(true)
    })

    test('it returns the indices of all unrevealed cards', () => {
      expect(result).toEqual([0, 2])
    })
  })
})
