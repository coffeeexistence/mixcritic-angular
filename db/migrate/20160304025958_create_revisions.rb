class CreateRevisions < ActiveRecord::Migration
  def change
    create_table :revisions do |t|
      t.string :title
      t.text :description
      t.integer :mix_id
      t.integer :upload_id

      t.timestamps null: false
    end
  end
end
