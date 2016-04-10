class MixesController < ApplicationController
  before_action :authenticate_user!, :except => [:show, :index, :show_more]
  require 'concerns/s3-uploadable'
  extend S3Uploadable 
  
  def index
    @mixes=Mix.all
  end

  def show
    @mix=Mix.find(params[:id])
    @mix.increment_view_count
  end

  def new
    @mix=current_user.mixes.new
  end

  def create
    @mix=current_user.mixes.new(mix_params)
    if @mix.save
      #@mix.labels.create()
      first_revision=@mix.revisions.create
      mix_file=params['mix_submission']['mix_file']
      S3Uploadable.upload_file(file:mix_file, for_object: first_revision)
      redirect_to mix_path(@mix)
    else
      render 'new'
    end
  end

  def edit
    @mix=Mix.find(params[:id])
    render edit_mix_path
  end

  def update
    if @mix.save
      first_revision=@mix.revisions.create
      mix_file=params['mix_submission']['mix_file']
      S3Uploadable.upload_file(file:mix_file, for_object: first_revision)
      redirect_to mix_path(@mix)
    else
      render edit_mix_path
    end

  end

  def destroy
    @mix=Mix.find(params[:id])
    
    if current_user==@mix.user
      @mix.destroy
      redirect_to mixes_path
    else
      alerts.push("You are not authorized to delete this mix")
      redirect_to mix_path(@mix)
    end
  end

  def show_more
    @mix=Mix.find(params[:mix_id])
    render json: @mix
  end

  private

    def mix_params
      params.require(:mix).permit(:title, :description, :genre_id, label_attributes:[:name])
    end
end
