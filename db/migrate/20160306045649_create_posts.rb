class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :critique_id
      t.text :body
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
