class Mix < ActiveRecord::Base
  belongs_to :user
  has_many :revisions
  belongs_to :genre

  has_many :mix_help_topics
  has_many :help_topics, through: :mix_help_topics

  accepts_nested_attributes_for :revisions, reject_if: :invalid_revision?
  accepts_nested_attributes_for :revisions

  validates :title, length: { minimum: 10 }
  validates :description, length: { minimum: 10 }
  validates :user_id, presence: true
  validates :genre_id, presence: true

  def creator_name
    self.user.available_name
  end

  def current_revision
    self.revisions.last
  end

  def current_revision_audio_path
    self.current_revision.audio_path
  end

  def first_revision
    self.revisions.first
  end

  def invalid_revision?(revision)
    revision['file'].empty?
  end

  def short_description
    max_length=60
    desc = self.description
    if desc.length>=max_length
      return desc[0...(max_length-1)]+"..."
    else
      return desc
    end
  end

  def created_by?(user)
    self.user==user
  end

  def increment_view_count
    self.views=self.views+1
    self.save
  end

  def critique_count
    self.revisions.inject(0){|sum,revision| sum + revision.critique_count }
  end

end
