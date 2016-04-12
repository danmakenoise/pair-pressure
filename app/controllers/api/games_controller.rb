class Api::GamesController < ApplicationController
  def save
    game = Game.new game_params
    game.save

    render json: game.token
  end

  private

  def game_params
    params.require(:game).permit(:cards)
  end
end
