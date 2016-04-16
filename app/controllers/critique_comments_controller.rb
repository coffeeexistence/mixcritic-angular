class CritiqueCommentsController < ApplicationController
  before_action :authenticate_user!

  def index
    critique = Critique.find(params[:critique_id])
    render json: critique.comments.all
  end

  def create
    critique = Critique.find(params[:critique_id])
    comment = critiques.new(critique_params)

    if critique.save
      render json: {success: true}
    else
      render json: {success: false}
    end

  end

  private

    def comment_params
      params.require(:critique).permit(:body)
    end

end
