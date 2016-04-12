class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :cards, null: false
      t.string :token, null: false

      t.timestamps
    end

    add_index :games, :token, unique: true
  end
end
