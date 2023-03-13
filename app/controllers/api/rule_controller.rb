class Api::RuleController < ApplicationController
  def get_rules_list
    two_minutes = 2.minutes.ago
    @rules = Rule.all
    render json: @rules
  end
  def create_rule
    rule_name = params[:rule_name]
    query_string = params[:query_string]
    mongo_query = params[:mongo_query]
    build_query = params[:build_query]
    if rule_name && query_string && mongo_query && build_query
      r = Rule.new()
      r.name = rule_name
      r.query_string = query_string
      r.mongo_query = mongo_query
      r.build_query = build_query
      r.created_by = current_user.id
      r.save
    end
    get_rules_list
  end
  def update_rule

    rule_id = params[:rule_id]
    if rule_id.present?
      rule_name = params[:name]
      query_string = params[:query_string]
      mongo_query = params[:mongo_query]
      build_query = params[:build_query]
      r = Rule.find(rule_id)
      r.name = rule_name
      r.query_string = query_string
      r.mongo_query = mongo_query if mongo_query
      r.build_query = build_query if build_query
      r.updated_by = current_user.id
      r.is_active = false
      r.save
    end


    get_rules_list
  end
  def update_rulestatus
    rule_id = params[:rule_id]
    status = params[:status]
    if rule_id.present?
      r = Rule.find(rule_id)
      r.is_active = status
      r.save
    end
    get_rules_list
  end
end
