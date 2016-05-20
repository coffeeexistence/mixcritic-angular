class UsersController < ApplicationController


  def show
    user = User.find(params[:id])
    user_info = {
      name: user.available_name,
      img: user.image_paths,
      id: user.id
    }
    render json: user_info
  end

  def profile
    render json: User.find(params[:user_id])
  end

  def critiques
    render json: User.find(params[:user_id]).critiques_index
  end

  def mixes
    render json: User.find(params[:user_id]).mixes_index
  end

end
