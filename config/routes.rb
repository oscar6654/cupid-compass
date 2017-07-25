Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:index, :show, :destroy, :edit, :update]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#index"

  resources :locations, only: [:index, :new, :create, :show], to: 'static_pages#index' do
    resources :reviews, only: [:index,:show,:new,:create], to: 'static_pages#index'
  end

  namespace :api do
    namespace :v1 do
      resources :locations, only: [:index, :create, :show] do
        resources :reviews, only: [:index, :create, :show, :update, :edit]
      end
      resources :users, only: [:index]
    end
  end
  namespace :admin do
    resources :reviews, only: [:edit, :update, :destroy]
    resources :locations
  end
end
