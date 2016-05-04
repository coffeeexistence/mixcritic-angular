Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  root 'front_end#index'

  scope '/api' do
    resources :users_data, only: [:show]

    resources :mixes, only: [:index, :create, :show, :update], defaults: {format: :json}

    resources :genres, only: [:index]

    resources :revisions, only: [:show, :update, :create] do
      resources :critiques, only: [:show, :index] do #revision provides critique index
        post '/comments/batch', to: 'critique_comments#batch'
        resources :critique_comments, only: [:index, :create, :show], path: 'comments', as: 'comments'
      end
    end

  end


end
