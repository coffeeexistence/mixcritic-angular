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

  def mix_info
    {title: self.revision.mix.title, id: self.revision.mix.id}
  end

  def revision_audio_path
    self.revision.upload.url
  end

end
