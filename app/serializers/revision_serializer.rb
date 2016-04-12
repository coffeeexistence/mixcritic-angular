class RevisionSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :upload, :critiques
end
