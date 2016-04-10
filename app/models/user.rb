class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook]

  has_many :mixes
  has_many :invites_sent, foreign_key: "mixer_id", class_name: "Invite"

  has_many :critiques, foreign_key: "critic_id"
  has_many :invites_received, foreign_key: "critic_id", class_name: "Invite"

  has_many :tags, foreign_key: "critic_id", class_name: "Tag"

  has_attached_file :avatar, default_url: ':style/default.png', :styles => {
      :tiny => "50x50#",
      :thumb => "100x100#",
      :small  => "150x150>",
      :medium => "200x200" }

  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  def available_name

    if self.full_name
      name =  self.full_name
    elsif self.username
      name = self.username
    else
      name = self.email
    end
    max_length=23
    if name.length>max_length
      return name[0...20]+"..."
    else
      return name 
    end
  end




  ###############OMNIAUTH####################

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.full_name = auth.info.name   # assuming the user model has a name
      #user.image = auth.info.image # assuming the user model has an image
    end
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end

  
end
