/* @flow */

type CardType = {
  color: string,
  symbol: string,
}

type ParamsType = {
  card: CardType,
  otherCard: CardType,
}

type FunctionType = ParamsType => boolean

const isMatch: FunctionType = ({ card, otherCard }) => (
  card.color === otherCard.color && card.symbol === otherCard.symbol
)

export default isMatch
