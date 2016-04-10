class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.string :title
      t.string :subtitle
      t.string :url
      t.string :class
      t.string :qty
      t.boolean :active
      t.datetime :time
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
