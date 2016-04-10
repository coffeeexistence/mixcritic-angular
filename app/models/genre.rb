class Genre < ActiveRecord::Base
  has_many :mixes
end
