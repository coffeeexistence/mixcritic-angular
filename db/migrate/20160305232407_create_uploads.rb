class CreateUploads < ActiveRecord::Migration
  def change
    create_table :uploads do |t|
      t.string :url
      t.string :name
      t.string :revision_id

      t.timestamps null: false
    end
  end
end
