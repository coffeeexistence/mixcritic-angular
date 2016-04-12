Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  root 'home#index'
  resources :mixes do
    get :show_more
  end

  resources :revisions do
      resources :critiques, only: [:new, :create]
  end

  resources :uploads, only: [:new, :index, :create]

  resources :front_end

  get 'api/mixes', to: 'api#mixes'
  get 'api/mix/:id', to: 'api#mix'
  get 'api/revision/:id', to: 'api#revision'
  get 'api/short_user_info/:id', to: 'api#short_user_info'


end
