Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  root 'front_end#index'

  scope '/api' do
    scope '/users' do
      get '/batch', to: 'users#batch'
      get '/:id', to: 'users#show'
      get '/profile', to: 'users#profile'
      get '/critiques', to: 'users#critiques'
      get '/mixes', to: 'users#mixes'
    end

    resources :mixes, only: [:index, :create, :show, :update], defaults: {format: :json}

    resources :genres, only: [:index]

    resources :revisions, only: [:show, :update, :create] do

    end

    resources :critiques, only: [:show, :index, :create] do #revision provides critique index
      post '/comments/batch', to: 'critique_comments#batch'
      resources :critique_comments, only: [:index, :create, :show], path: 'comments', as: 'comments'
    end

  end


end
