class MixesController < ApplicationController

  require 'concerns/s3-uploadable'
  extend S3Uploadable

  def index
    render json: Mix.all.order(id: :desc)
  end

  def show
    mix = Mix.find(params[:id])
    render json: mix
  end

  def create
    @mix=current_user.mixes.new(mix_params)
    if @mix.save
      first_revision=@mix.revisions.create
      mix_file=params['mix_file']
      S3Uploadable.upload_file(file:mix_file, for_object: first_revision)
      render json: {success: true, mix_id: @mix.id}
    else
      render json: {success: false, message: @mix.errors}
    end
  end

  def update
    @mix=Mix.find(params[:id])
    if @mix.save
      first_revision=@mix.revisions.create
      mix_file=params['mix_file']
      S3Uploadable.upload_file(file:mix_file, for_object: first_revision)
      render json: {success: true, mix_id: @mix.id}
    else
      render json: {success: false, message: @mix.errors}
    end
  end


  def destroy
    @mix=Mix.find(params[:id])

    if current_user==@mix.user
      @mix.destroy
      render json: {success: true}
    else
      render json: {success: false, message: "You are not authorized to delete this mix"}
    end
  end





  private

    def mix_params
      params.require(:mix).permit(:title, :description, :genre_id, label_attributes:[:name])
    end

end
