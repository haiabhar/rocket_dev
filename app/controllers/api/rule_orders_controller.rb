class Api::RuleOrdersController < ApplicationController
  
  def get_rule_orders_list
    @rule_orders = RuleOrder.all#active
    render json: @rule_orders
  end

  def create_rule_order
    if params["rule_order_id"].present?
      ro = RuleOrder.find_by_id(params["rule_order_id"])
    else
      ro = RuleOrder.new()
    end
    ro.name = params["name"]
    ro.save
    get_rule_orders_list
  end

  def update_rule_order_status
    rule_order_id = params[:rule_order_id]
    status = params[:status]
    if rule_order_id.present?
      r = RuleOrder.find(rule_order_id)
      r.is_active = status
      r.save
    end
    get_rule_orders_list
  end

  def get_rule_order
    @rule_order = RuleOrder.find_by_id(params["rule_order_id"])
    render json: @rule_order
  end

end
