class CritiquesController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: Revision.find(params[:revision_id]).critiques
  end

  def show
    render json: Critique.find(params[:id])
  end

  def create
    revision = Revision.find(params[:revision_id])
    critique = revision.critiques.new(critique_params)

    if @critique.save
      render json: {success: true}
    else
      render json: {success: false}
    end
  end

  private

    def critique_params
      params.require(:critique).permit(:body, :critic_id)
    end


end
