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

  has_many :critique_comments

  has_attached_file :avatar, default_url: '/user_avatars/:style/default.png', :styles => {
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

  def full_name
    return false if (!self.first_name || !self.last_name)
    self.first_name + ' ' + self.last_name
  end
  
  def image_url(image)
    (image = image[1..-1]) if (image[0] == '/')
    ActionController::Base.helpers.asset_path(image)
  end
  
  def has_image?
    self.avatar.file?
  end

  def image_paths
    tiny = self.avatar.url(:tiny)
    thumb = self.avatar.url(:thumb)
    small = self.avatar.url(:small)
    medium = self.avatar.url(:medium)
        
    if self.has_image?
      { tiny: tiny, thumb: thumb, small: small, medium: medium }
     else 
      { tiny: self.image_url(tiny), thumb: self.image_url(thumb), small: self.image_url(small), medium: self.image_url(medium) }
     end
  end

  def critiques_index
    self.critiques.pluck('id')
  end

  def mixes_index
    self.mixes.pluck('id')
  end

  def set_full_name(name)
    split_name = name.split(' ')
    if split_name.length >= 2
      self.first_name = split_name[0]
      self.last_name = split_name[1]
    else
      self.username = auth.info.name
    end
  end

  def picture_from_url(url)
    self.avatar = URI.parse(url)
  end


  ###############OMNIAUTH####################

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.set_full_name(auth.info.name)   # assuming the user model has a name
      user.picture_from_url(auth.info.image)
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
