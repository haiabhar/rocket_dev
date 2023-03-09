class Api::RuleController < ApplicationController
  def get_rules_list
    @rules = Rule.select("rules.*")
    render json: @rules
  end
  def create_rule
    rule_name = params[:rule_name]
    query_string = params[:query_string]
    exact_match = params[:exact_match]
    if rule_name && query_string && exact_match
      r = Rule.new()
      r.name = rule_name
      r.query_string = query_string
      r.exact_match = exact_match
      r.created_by = current_user.id
      r.save
    end
    @rules = Rule.all
    render json: @rules
  end
  def update_rule

    rule_id = params[:rule_id]
    if rule_id.present?
      rule_name = params[:name]
      query_string = params[:query_string]
      exact_match = params[:exact_match]
      r = Rule.find(rule_id)
      r.name = rule_name
      r.query_string = query_string
      r.exact_match = exact_match
      r.updated_by = current_user.id
      r.save
    end


    @rules = Rule.select("rules.*")
    render json: @rules
  end
end
