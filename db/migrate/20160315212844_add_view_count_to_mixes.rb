class AddViewCountToMixes < ActiveRecord::Migration
  def change
    add_column :mixes, :views, :integer, default: 0
  end
end
