class MixHelpTopic < ActiveRecord::Base
  belongs_to :mix 
  belongs_to :topic
end
