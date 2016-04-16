class CritiqueCommentsController < ApplicationController

  def index
    critique = Critique.find(params[:critique_id])
    render json: critique.comments.all
  end

  def create
    authenticate_user!

    comment_params = critique_comment_params
    comment_params[:user_id] = current_user.id
    comment_params[:critique_id] = params[:critique_id]

    new_comment = current_user.critique_comments.new(comment_params)

    if new_comment.save
      render json: {success: true}
    else
      render json: {success: false}
    end

  end

  private

    def critique_comment_params
      params.require(:critique_comment).permit(:body)
    end

end
