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

end 