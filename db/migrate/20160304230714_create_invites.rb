class CreateInvites < ActiveRecord::Migration
  def change
    create_table :invites do |t|
      t.integer :mix_id
      t.integer :critic_id
      t.integer :mixer_id
      t.boolean :accepted
      t.string :note
      t.integer :offer

      t.timestamps null: false
    end
  end
end
