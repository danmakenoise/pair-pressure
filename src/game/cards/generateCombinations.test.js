import generateCombinations from './generateCombinations'

describe('generateCombinations()', () => {
  test('it is a function', () => {
    expect(typeof generateCombinations).toBe('function')
  })

  describe('when given no arguments', () => {
    test('it returns an empty array', () => {
      expect(generateCombinations()).toEqual([])
    })
  })

  describe('when given colors and symbols', () => {
    const colors = ['red', 'blue']
    const symbols = ['A', 'B']

    const result = generateCombinations({ colors, symbols })

    test('it generates cards properly', () => {
      expect(result.length).toBe(symbols.length * 2)

      result.forEach(card => {
        expect(colors.indexOf(card.color) >= 0).toBe(true)
        expect(symbols.indexOf(card.symbol) >= 0).toBe(true)
        expect(card.isRevealed).toBe(false)
      })
    })
  })
})
