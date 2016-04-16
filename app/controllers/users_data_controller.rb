class UsersDataController < ApplicationController


  def show
    user = User.find(params[:id])

    user_info = {
      name: user.available_name,
      img: {
        tiny: view_context.image_path(user.avatar.url(:tiny)),
        thumb: view_context.image_path(user.avatar.url(:thumb)),
        small: view_context.image_path(user.avatar.url(:small))
      }
    }

    render json: user_info
  end



end
