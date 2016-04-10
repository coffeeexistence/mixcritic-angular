class Upload < ActiveRecord::Base
  belongs_to :revision
  def send_to_bucket

  end
end
