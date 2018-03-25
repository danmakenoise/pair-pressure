/* @flow */

type ParamsType = {
  index: number,
  cards: Array<{ isRevealed: boolean }>,
}

type FunctionType = ParamsType => Array<{ isRevealed: boolean }>

const chooseCard: FunctionType = ({ index, cards }) => {
  if (cards[index].isRevealed) {
    throw new Error('InvalidCard: chosen card was already revealed')
  }

  const output = [...cards]
  output[index].isRevealed = true

  return output
}

export default chooseCard
