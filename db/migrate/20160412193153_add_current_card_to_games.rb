class AddCurrentCardToGames < ActiveRecord::Migration
  def change
    add_column :games, :current_card, :integer
  end
end
