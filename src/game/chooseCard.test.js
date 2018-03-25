import chooseCard from './chooseCard'

describe('chooseCard()', () => {
  test('it is a function', () => {
    expect(typeof chooseCard).toBe('function')
  })

  describe('when passed a valid index, and cards', () => {
    const cards = [
      { isRevealed: false },
      { isRevealed: true }
    ]

    const result = chooseCard({ index: 0, cards })

    test('it sets the chosen card to isRevealed=true', () => {
      expect(result[0].isRevealed).toBe(true)
    })

    test('it returns a new array', () => {
      expect(result).not.toBe(cards)
    })
  })

  describe('when passed an index of a card that is already revealed', () => {
    const cards = [
      { isRevealed: false },
      { isRevealed: true }
    ]

    test('it throws an error', () => {
      expect(() => chooseCard({ index: 1, cards })).toThrow()
    })
  })
})
