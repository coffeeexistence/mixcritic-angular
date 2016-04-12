class ApiController < ApplicationController

  def mixes
    render json: Mix.all.order(id: :desc)
  end

  def short_user_info
    user = User.find(params[:id])

    user_info = {
      name: user.available_name,
      img: {
        tiny: user.avatar.url(:tiny),
        thumb: user.avatar.url(:thumb),
        small: user.avatar.url(:small)
      }
    }

    render json: user_info
  end

  def mix
    mix = Mix.find(params[:id])
    render json: mix
  end

  def revision
    revision = Revision.find(params[:id])
    render json: revision
  end

end
