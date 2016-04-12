class Api::PlayersController < ApplicationController

  def create
    game = Game.find_by token: params[:token]

    if session[:player_token]
      player = Player.find_by player_token: session[:player_token]
    end

    if player && player.game == game
      render json: { player: player, votes: player.vote }
    else
      player = Player.create! game_id: game.id
      session[:player_token] = player.player_token
      render json: player
    end
  end
end
