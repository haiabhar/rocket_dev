class Api::RuleController < ApplicationController
  def get_rules_list
    two_minutes = 2.minutes.ago
    @rules = Rule.joins(:category,:rule_type,:rule_order).select("rules.*,rule_types.name as rule_type_name,categories.name as category_name,rule_orders.name as priority")
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
      r.category_id = Category.find_by(name: params[:category_id])&.id if params[:category_id].present?
      r.sub_category_id = SubCategory.find_by(name: params[:sub_category_id])&.id if params[:sub_category_id].present?
      r.rule_type_id = RuleType.find_by(name: params[:rule_type_id])&.id if params[:rule_type_id].present?
      r.rule_order_id = RuleOrder.find_by(name: params[:rule_order_id])&.id if params[:rule_order_id].present?
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
      # r.is_active = false
      r.category_id = Category.find_by(name: params[:category_id])&.id if params[:category_id].present?
      r.sub_category_id = SubCategory.find_by(name: params[:sub_category_id])&.id if params[:sub_category_id].present?
      r.rule_type_id = RuleType.find_by(name: params[:rule_type_id])&.id if params[:rule_type_id].present?
      r.rule_order_id = RuleOrder.find_by(name: params[:rule_order_id])&.id if params[:rule_order_id].present?
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
