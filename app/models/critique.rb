class Critique < ActiveRecord::Base
  belongs_to :critic, foreign_key: "critic_id", class_name: "User"
  has_many :posts
  has_many :comments, class_name: "CritiqueComment"
  belongs_to :revision

  validates :body, length: { minimum: 10 }
  validates :revision_id, presence: true
  validates :critic_id, presence: true

  def writer_name
    self.critic.available_name
  end

end
