class Revision < ActiveRecord::Base
  belongs_to :mix
  belongs_to :upload
  has_many :song_changes
  has_many :critiques

  def audio_path
    if self.upload
      self.upload.url
    else
      "You don't have anything uploaded for this revision"
    end
  end

  def top_5_critiques
    self.critiques.order(id: :desc).first(5)
  end

  def critique_count
    self.critiques.all.length
  end
end
