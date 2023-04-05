class Api::FlexibleTextconfigController < ApplicationController

  before_action :set_flexible_textconfig_id, :only => [:get_all_flexible_textconfig]
  
  def get_all_flexible_textconfig
    @flexible_text_config = @flexible_text.flexible_text_configs&.active #SubCategory.active
    
    render json: @flexible_text_config
  end

  def get_flexible_textconfig
    @flexible_text_config = FlexibleTextConfig.find_by_id(params[:flexible_textconfig_id])
    render json: @flexible_text_config
  end

  def create_flexible_textconfig
    if params["flexible_textconfig_id"].present?
      sc = FlexibleTextConfig.find_by_id(params["flexible_textconfig_id"])
    else
      sc = FlexibleTextConfig.new()
      sc.flexible_text_id = params["textconfig_id"]
    end
    sc.config_type = params["config_type"]
    sc.regex_start = params["regex_start"]
    sc.regex_end = params["regex_end"]
    sc.save

    @flexible_text = sc.flexible_text

    get_all_flexible_textconfig
  end

  def update_flexible_textconfig_status
    flexible_textconfig_id = params[:flexible_textconfig_id]
    status = params[:status]
    if flexible_textconfig_id.present?
      r = FlexibleTextConfig.find(flexible_textconfig_id)
      r.is_active = status
      r.save
    end
    @flexible_text = r.flexible_text
    get_all_flexible_textconfig
  end

  private

  def set_flexible_textconfig_id
    @flexible_text = FlexibleText.find(params[:textconfig_id])
  end

end 
