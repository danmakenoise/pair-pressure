class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :game_id, null: false
      t.integer :card, null: false

      t.timestamps
    end

    add_index :votes, :game_id
  end
end
