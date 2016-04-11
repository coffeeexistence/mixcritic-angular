class ApiController < ApplicationController

  def mixes
    render json: Mix.all
  end
end
