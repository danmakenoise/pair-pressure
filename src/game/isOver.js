/* @flow */

type CardsType = Array<{
  isRevealed: boolean
}>

type FunctionType = CardsType => boolean

const isOver: FunctionType = cards => cards.reduce((isOver, card) => (
  isOver && card.isRevealed
), true)

export default isOver
