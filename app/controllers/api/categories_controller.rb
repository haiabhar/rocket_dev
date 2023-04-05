class Api::CategoriesController < ApplicationController
  
  def get_all_categories
    @categories = Category.active
    render json: @categories
  end

  def create_category
    if params["category_id"].present?
      c = Category.find_by_id(params["category_id"])
    else
      c = Category.new()
    end
    c.name = params["name"]
    c.save
    get_all_categories
  end

  def get_category
    @category = Category.find_by_id(params["category_id"])
    render json: @category
  end

  def get_dynamic_form  
          category = []   
          rule_type = []   
          priority = []   
          sub_cat = []  
          catname = ''
          subcatname = ''
          ruletype = ''
          ruleorder = ''
          res = Category.active 
          if res.present?
            res.each do |r|   
            category << r.name                    
            end
          end
          rule = RuleType.active
          if rule.present?
            rule.each do |rt|   
            rule_type << rt.name                    
            end
          end
          prior = RuleOrder.active
          if prior.present?
            prior.each do |pt|   
            priority << pt.name                    
            end
          end
          if params[:id].present?
            rule = Rule.find(params[:id])
            catname = Category.find(rule&.category_id)&.name if rule&.category_id.present?
            subcatname = SubCategory.find(rule&.sub_category_id)&.name if rule&.sub_category_id.present?
            ruletype = RuleType.find(rule&.rule_type_id)&.name if rule&.rule_type_id.present?
            ruleorder = RuleOrder.find(rule&.rule_order_id)&.name if rule&.rule_order_id.present?
            subc = SubCategory.where(category_id: rule&.category_id) if rule&.category_id.present? 
            if subc.present?
              subc.each do |c|   
              sub_cat << c.name                    
              end 
            end 
          end
      render json: [category,rule_type,priority,sub_cat,catname,subcatname,ruletype,ruleorder]
  end

  def get_sub_categorys
    if params[:category_name].present?
          pr = Category.find_by(name: params[:category_name])
          subcat = [] 
          subc = SubCategory.where(category_id: pr.id) if pr.present? 
          if subc.present?
            subc.each do |c|   
            subcat << c.name                    
            end 
          end 
      render json: subcat 
    end
  end

end 