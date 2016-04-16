class RevisionsController < ApplicationController

  def show
    revision = Revision.find(params[:id])
    render json: revision
  end

end
