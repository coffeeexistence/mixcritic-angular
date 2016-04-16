Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }


  root 'front_end#index'

  scope '/api' do
    resources :users_data, only: [:show]

    resources :mixes, only: [:index, :create, :show, :update]

    resources :revisions, only: [:show, :update, :create] do
      resources :critiques, only: [:show, :index] do #revision provides critique index
        post '/comments/batch', to: 'critique_comments#batch'
        resources :critique_comments, only: [:index, :create, :show], path: 'comments', as: 'comments'
      end
    end

  end


  #get 'api/mixes', to: 'api#mixes'
  #get 'api/mix/:id', to: 'api#mix'
  #get 'api/revision/:id', to: 'api#revision'
  #get 'api/short_user_info/:id', to: 'api#short_user_info'
  #get 'api/critique_comments/:id', to: 'api#critique_comments'
  #post 'api/critique_comment', to: 'api#new_critique_comment'


end
