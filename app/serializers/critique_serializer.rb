class CritiqueSerializer < ActiveModel::Serializer
  attributes :id, :body, :revision_id, :upvotes, :quality, :mix_info, :revision_audio_path, :critic_id
end
