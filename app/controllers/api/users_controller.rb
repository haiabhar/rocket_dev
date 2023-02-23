class Api::UsersController < ApplicationController
  def user_current
    @user = User.find(current_user&.id)
    render json: @user
  end
end