class CreateMixes < ActiveRecord::Migration
  def change
    create_table :mixes do |t|
      t.string :title
      t.text :description
      t.integer :user_id
      t.integer :genre_id

      t.timestamps null: false
    end
  end
end
