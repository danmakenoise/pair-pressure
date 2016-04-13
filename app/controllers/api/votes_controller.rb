class Api::VotesController < ApplicationController
  def vote
    game = Game.find_by token: params[:vote][:token]
    vote = Vote.new vote_params
    player = Player.find_by player_token: session[:player_token]
    vote.game_id = game.id
    vote.player_id = player.id

    vote.save
    render json: vote
  end

  def load
    game = Game.find_by token: params[:token]
    winner = Vote
      .where(game_id: game.id)
      .group(:card)
      .order(count: :desc)
      .count
      .first

    winning_card = winner[0] if winner

    Vote.where(game_id: game.id).destroy_all

    render json: ( winning_card || -1 )
  end

  private

  def vote_params
    params.require(:vote).permit(:card)
  end
end