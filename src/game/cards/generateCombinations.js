/* @flow */

type ParamsType = {
  colors: Array<string>,
  symbols: Array<string>
}

type ReturnType = Array<{
  color: string,
  symbol: string,
  isRevealed: boolean
}>

type FunctionType = ParamsType => ReturnType

const generateCombinations: FunctionType = ({ colors = [], symbols = [] } = {}) => (
  symbols.reduce((cards, symbol) => {
    const colorIdx = Math.floor(Math.random() * colors.length)
    const color = colors[colorIdx]

    const card = { color, symbol, isRevealed: false }

    return cards.concat([card, Object.assign({}, card)])
  }, [])
)

export default generateCombinations
