class ApplicationController < ActionController::Base
	include Authenticable
	protect_from_forgery except: [:verify_login]
	before_action :authenticate_user!
end
