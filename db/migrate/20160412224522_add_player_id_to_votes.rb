class AddPlayerIdToVotes < ActiveRecord::Migration
  def change
    add_column :votes, :player_id, :integer
  end
end
