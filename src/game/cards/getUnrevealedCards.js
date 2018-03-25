/* @flow */

type CardsType = Array<{ isRevealed: boolean }>

type FunctionType = CardsType => Array<number>

const getUnrevealedCards: FunctionType = (cards = []) => cards
  .map((card, index) => card.isRevealed ? -1 : index)
  .filter(index => index >= 0)

export default getUnrevealedCards
