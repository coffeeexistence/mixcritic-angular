class CritiquesController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: Revision.find(params[:revision_id]).critiques
  end

  def show
    render json: Critique.find(params[:id])
  end

  def create
    critique = current_user.critiques.new(critique_params)
    critique.revision_id = params[:revision_id]

    if critique.save
      render json: {success: true, id: critique.id}
    else
      byebug
      render json: {success: false}
    end
  end

  private

    def critique_params
      params.require(:critique).permit(:body)
    end


end
