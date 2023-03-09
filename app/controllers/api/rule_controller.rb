class Api::RuleController < ApplicationController
  def get_rules_list
    two_minutes = 2.minutes.ago
    @rules = Rule.select("rules.*, CASE WHEN  updated_at > '#{two_minutes}' THEN 'row_updated_now' ELSE ''  END AS status_class")
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
      r.save
    end


    get_rules_list
  end
end
