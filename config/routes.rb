Rails.application.routes.draw do
  devise_for :users
  devise_scope :user do
    get 'destroy_user' => 'devise/sessions#destroy'
  end

  namespace :api do
    get 'user_current', to: 'users#user_current'
    post 'search_user', to: 'users#search_user'
  end
  

  root 'home#index'
  post 'verify_login', to: 'home#verify_login'
end
