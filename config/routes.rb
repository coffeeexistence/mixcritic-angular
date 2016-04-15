Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  resources :mixes do
    get :show_more
  end

  resources :revisions do
      resources :critiques, only: [:new, :create]
  end

  resources :uploads, only: [:new, :index, :create]

  root 'front_end#index'

  get 'api/mixes', to: 'api#mixes'
  get 'api/mix/:id', to: 'api#mix'
  get 'api/revision/:id', to: 'api#revision'
  get 'api/short_user_info/:id', to: 'api#short_user_info'
  get 'api/critique_comments/:id', to: 'api#critique_comments'
  post 'api/critique_comment', to: 'api#new_critique_comment'


end
