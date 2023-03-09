class Api::UsersController < ApplicationController
  def user_current
    @user = User.find(current_user&.id).as_json(include: { roles: {}})
    render json: @user
  end
  def search_user
    search_type = params[:search_type]
    search_text = params[:search_text]
    if search_type == 'Name'
      @user = User.where("full_name LIKE ?", "%#{search_text}%").as_json(include: { roles: {}})
    elsif search_type == 'Email Address'
      @user = User.where(email: search_text).as_json(include: { roles: {}})
    elsif search_type == 'Employee Number'
      @user = User.where(emp_id: search_text).as_json(include: { roles: {}})
    end
    
    render json: @user.present? ? @user : [{id: 0}]
  end
  def get_role_list
    @roles = Role.where("id != 1 AND is_active = true").select("id as role_id, name")
    render json: @roles
  end
  def update_user
    user_id = params[:user_id]
    user_roles = params[:user_roles]
      if user_roles.any?
        UserRole.where(user_id: user_id).destroy_all
        user_roles.each do |role|
            ur = UserRole.new()
            ur.user_id = user_id
            ur.role_id = role
            ur.save

        end
      end
      render json: {status: "Updated successfully"}
  end
end