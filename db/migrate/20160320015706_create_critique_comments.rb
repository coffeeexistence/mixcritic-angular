class CreateCritiqueComments < ActiveRecord::Migration
  def change
    create_table :critique_comments do |t|
      t.integer :critique_id
      t.integer :user_id
      t.text :body

      t.timestamps null: false
    end
  end
end
