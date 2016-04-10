class HelpTopic < ActiveRecord::Base
  has_many :mix_help_topics
  has_many :mixes, through: :mix_help_topics
end
