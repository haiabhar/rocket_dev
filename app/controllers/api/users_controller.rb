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
end