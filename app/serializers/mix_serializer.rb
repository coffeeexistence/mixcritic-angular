class MixSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :user_id, :current_revision_audio_path,
    :genre, :views, :critique_count, :current_revision_id
end
