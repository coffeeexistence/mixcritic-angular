class UserSerializer < ActiveModel::Serializer
  attributes :id, :available_name, :title, :bio, :city, :country, :image_paths
end
