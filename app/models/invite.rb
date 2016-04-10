class Invite < ActiveRecord::Base
  belongs_to :mix
  belongs_to :mixer, foreign_key: "mixer_id", class_name: "User"
  belongs_to :critic, foreign_key: "critic_id", class_name: "User"
end
