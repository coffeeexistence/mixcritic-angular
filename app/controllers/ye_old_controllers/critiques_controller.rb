class CritiquesController < ApplicationController
  before_action :set_mix_and_revision
  before_action :authenticate_user!
  def new
    @critique = @revision.critiques.new
  end

  def create
    @critique=@revision.critiques.new(critique_params)

    if @critique.save 
      critique_partial = render_to_string partial: 'mixes/show_critique', locals:{critique: @critique}, layout: false
      critique_json = {partial: critique_partial, revision_id: @revision.id}.to_json
      render json: critique_json, status: 201
    else
      render json: @critique.errors.full_messages.to_json, status: 411
    end
  end

  private

    def critique_params
      params.require(:critique).permit(:body, :critic_id)
    end

    def set_mix_and_revision
      @revision=Revision.find(params[:revision_id])
      @mix=@revision.mix
    end

    def critique_params
      params.require(:critique).permit(:title, :body, :critic_id)
    end
end
