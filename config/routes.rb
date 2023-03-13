Rails.application.routes.draw do
  devise_for :users
  devise_scope :user do
    get 'destroy_user' => 'devise/sessions#destroy'
  end

  namespace :api do
    post 'get_rules_list', to: 'rule#get_rules_list'
    post 'create_rule', to: 'rule#create_rule'
    post 'update_rule', to: 'rule#update_rule'
    post 'update_rulestatus', to: 'rule#update_rulestatus'
  end
  namespace :api do
    get 'user_current', to: 'users#user_current'
    post 'search_user', to: 'users#search_user'
    post 'get_role_list', to: 'users#get_role_list'
    post 'update_user', to: 'users#update_user'
  end
  

  root 'home#index'
  post 'verify_login', to: 'home#verify_login'
end
