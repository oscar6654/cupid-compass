Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:show]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#index"

  namespace :api do
    namespace :v1 do
      resources :locations, only: [:index] do
        resources :reviews, only: [:index]
      end
    end
  end
end
