class CreateCritiques < ActiveRecord::Migration
  def change
    create_table :critiques do |t|
      t.string :title
      t.text :body
      t.integer :revision_id
      t.integer :critic_id
      t.integer :thread_id
      t.integer :upvotes
      t.integer :quality

      t.timestamps null: false
    end
  end
end
