Rails.application.routes.draw do
  post 'file_uploads/upload'
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
    post 'get_dynamic_form', to: 'categories#get_dynamic_form'
    post 'get_sub_categorys', to: 'categories#get_sub_categorys'
    post 'update_category_status', to: 'categories#update_category_status'

    post 'get_incident_list', to: 'incident#get_incident_list'
    post 'get_myincident_list', to: 'incident#get_myincident_list'
    post 'assign_incident', to: 'incident#assign_incident'

    post 'get_all_sub_categories', to: 'sub_categories#get_all_sub_categories'
    post 'get_sub_category', to: 'sub_categories#get_sub_category'
    post 'create_sub_category', to: 'sub_categories#create_sub_category'
    post 'update_sub_category_status', to: 'sub_categories#update_sub_category_status'

    get 'get_incident_list', to: 'incident#get_incident_list'

    post 'get_rule_types_list', to: 'rule_types#get_rule_types_list'
    post 'create_rule_type', to: 'rule_types#create_rule_type'
    post 'get_rule_type', to: 'rule_types#get_rule_type'
    post 'update_rule_type_status', to: 'rule_types#update_rule_type_status'

    post 'get_rule_orders_list', to: 'rule_orders#get_rule_orders_list'
    post 'create_rule_order', to: 'rule_orders#create_rule_order'
    post 'get_rule_order', to: 'rule_orders#get_rule_order'
    post 'update_rule_order_status', to: 'rule_orders#update_rule_order_status'

    get 'get_all_textconfig', to: 'textconfig#get_all_textconfig'
    post 'get_textconfig', to: 'textconfig#get_textconfig'
    post 'create_textconfig', to: 'textconfig#create_textconfig'
    post 'update_textconfig_status', to: 'textconfig#update_textconfig_status'

    post 'get_all_flexible_textconfig', to: 'flexible_textconfig#get_all_flexible_textconfig'
    post 'get_flexible_textconfig', to: 'flexible_textconfig#get_flexible_textconfig'
    post 'create_flexible_textconfig', to: 'flexible_textconfig#create_flexible_textconfig'
    post 'update_flexible_textconfig_status', to: 'flexible_textconfig#update_flexible_textconfig_status'
  end
    get 'login_form_test', to: 'login_form_test#test_login_form_test'
  root 'home#index'
  post 'verify_login', to: 'home#verify_login'
end
