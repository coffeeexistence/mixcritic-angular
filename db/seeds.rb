require 'net/http'
require 'json'
 


def get_randomuser_data
  url = 'https://randomuser.me/api/'
  uri = URI(url)
  response = Net::HTTP.get(uri)
  JSON.parse(response)
end


def create_user 
  randomuser_data = get_randomuser_data
  
  user_creds = {
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    title: Faker::Name.title,
    bio: Faker::Hipster.paragraph,
    city: Faker::Address.city,
    country: Faker::Address.country,
    email: Faker::Internet.email,
    password: Faker::Internet.password(8),
  }

  new_user = User.new(user_creds)
  image_url = randomuser_data['results'][0]['picture']['large']
  new_user.picture_from_url(image_url)
  new_user.save
  create_mix_for_user(new_user)
end 

def create_mix_for_user(user)
  mix_params = {
    title:Faker::Book.title+' - '+Faker::Book.title,
    description: Faker::Hipster.paragraph,
    user_id: user.id,
    genre_id: Genre.all.sample.id
  }
  new_mix=Mix.new(mix_params)
  new_mix.save

  new_upload=Upload.create(url:'https://mixcritic.s3.amazonaws.com/DoopaLoopaLoop.mp3')
  mix_revision=Revision.create

  mix_revision.upload=new_upload
  mix_revision.mix = new_mix
  new_mix.revisions << mix_revision
  new_mix.user = user
  #byebug

end




help_topics = [ "Snare", "Drums", "Mic Positioning", "Vocals", "Guitar Tone", "Mastering",
  "Compression", "Bass Guitar", "Orchestra", "Synthesizers", "EQ", "Sound Field", "Reverb", "Delay",
  "Gating"]

genres = ["Acoustic", "Alternative", "Blues", "Classical", "Country",
  "Electronic", "Hip Hop" ,"Jazz" ,"Latin" ,"Metal", "Pop", "Rock"]

puts "Creating Genres and Help Topics"

genres.each do |genre|
  Genre.find_or_create_by(name:genre)
end

help_topics.each do |topic|
  HelpTopic.find_or_create_by(name:topic)
end




## Create Users
puts "Creating Users"

10.times do
  create_user
end

##Create Critics
puts "Creating Critics"

critics = []

shomo_creds = {
  email:'caleb@gmail.com',
  password:'gumdrops',
  password_confirmation:'gumdrops',
  avatar: File.open(Rails.root + "db/seed_files/shomo.jpg")
}
shomo_critic = User.new(shomo_creds)
shomo_critic.save
critics << shomo_critic


sturgis_creds = {
  email:'sturgis@gmail.com',
  password:'gumdrops',
  password_confirmation:'gumdrops',
  avatar: File.open(Rails.root + "db/seed_files/sturgis.jpg")
}
sturgis_critic = User.new(sturgis_creds)
sturgis_critic.save
critics << sturgis_critic

def critique_mix(critic)
  critique_params = {
    body: Faker::Hacker.say_something_smart,
    critic_id: critic.id
  }
  Mix.all.sample.revisions.last.critiques.create(critique_params)
end

puts "Writing Critiques"

10.times do
  critique_mix(critics.sample)
end

#Writing Comments

puts "Writing comments"

def write_comment(user:, critique:, type:)
  if type == :user
    critique.comments.create(user_id:user.id, body:Faker::Hipster.sentence)
  elsif type == :critic
    critique.comments.create(user_id:user.id, body:Faker::Hacker.say_something_smart)
  end
end

Critique.all.each do |critique|
  mix_creator = critique.revision.mix.user
  critic = critique.critic
  write_comment(user: mix_creator, critique: critique, type: :user)
  write_comment(user: critic, critique: critique, type: :critic)
end
