class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.integer :game_id, null: false
      t.string :player_token, null: false

      t.timestamps
    end

    add_index :players, :player_token
  end
end
