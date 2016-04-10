class CreateMixHelpTopics < ActiveRecord::Migration
  def change
    create_table :mix_help_topics do |t|
      t.integer :mix_id
      t.integer :help_topic_id
      t.timestamps null: false
    end
  end
end
