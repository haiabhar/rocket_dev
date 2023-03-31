class Api::RuleTypesController < ApplicationController
  
  def get_rule_types_list
    @rule_types = RuleType.all#active
    render json: @rule_types
  end

  def create_rule_type
    if params["rule_type_id"].present?
      rt = RuleType.find_by_id(params["rule_type_id"])
    else
      rt = RuleType.new()
    end
    rt.name = params["name"]
    rt.save
    get_rule_types_list
  end

  def update_rule_type_status
    rule_type_id = params[:rule_type_id]
    status = params[:status]
    if rule_type_id.present?
      r = RuleType.find(rule_type_id)
      r.is_active = status
      r.save
    end
    get_rule_types_list
  end

  def get_rule_type
    @rule_type = RuleType.find_by_id(params["rule_type_id"])
    render json: @rule_type
  end

end
