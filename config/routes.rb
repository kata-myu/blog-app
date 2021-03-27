Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }

  devise_scope :user do
    get 'users/new_address', to: 'users/registrations#new_address'
    post 'users/create_address', to: 'users/registrations#create_address'
  end

 root to: "blogs#index"
 resources :blogs do
  resources :comments, only: :create
  resources :likes, only: :create
  collection do
    get 'search'
    get 'ransack_search'
  end
 end
end
