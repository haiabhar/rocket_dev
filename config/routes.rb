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

    get 'user_current', to: 'users#user_current'
    post 'search_user', to: 'users#search_user'
    post 'get_role_list', to: 'users#get_role_list'
    post 'update_user', to: 'users#update_user'

    post 'get_notifications', to: 'notification#get_notifications'
    post 'create_notification', to: 'notification#create_notification'
    post 'get_notification', to: 'notification#get_notification'

    get 'get_all_categories', to: 'categories#get_all_categories'
    post 'get_category', to: 'categories#get_category'
    post 'create_category', to: 'categories#create_category'

    post 'get_all_sub_categories', to: 'sub_categories#get_all_sub_categories'
    post 'get_sub_category', to: 'sub_categories#get_sub_category'
    post 'create_sub_category', to: 'sub_categories#create_sub_category'

    get 'get_incident_list', to: 'incident#get_incident_list'

    post 'get_rule_types_list', to: 'rule_types#get_rule_types_list'
    post 'create_rule_type', to: 'rule_types#create_rule_type'
    post 'get_rule_type', to: 'rule_types#get_rule_type'
    post 'update_rule_type_status', to: 'rule_types#update_rule_type_status'

    post 'get_rule_orders_list', to: 'rule_orders#get_rule_orders_list'
    post 'create_rule_order', to: 'rule_orders#create_rule_order'
    post 'get_rule_order', to: 'rule_orders#get_rule_order'
    post 'update_rule_order_status', to: 'rule_orders#update_rule_order_status'

  end

  root 'home#index'
  post 'verify_login', to: 'home#verify_login'
end
