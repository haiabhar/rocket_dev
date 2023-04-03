class Api::TextconfigController < ApplicationController
  
  def get_all_textconfig
    @textconfigs = FlexibleText.active
    render json: @textconfigs
  end

  def create_textconfig
    if params["textconfig_id"].present?
      c = FlexibleText.find_by_id(params["textconfig_id"])
    else
      c = FlexibleText.new()
    end
    c.name = params["name"]
    c.save
    get_all_textconfig
  end

  def get_textconfig
    @textconfig = FlexibleText.find_by_id(params["textconfig_id"])
    render json: @textconfig
  end

end 