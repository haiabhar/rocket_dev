class Api::SubCategoriesController < ApplicationController

  before_action :set_category_id, :only => [:get_all_sub_categories]
  
  def get_all_sub_categories
    @sub_categories = @category.sub_categories.all #SubCategory.active
    
    render json: @sub_categories
  end

  def get_sub_category
    @sub_category = SubCategory.find_by_id(params[:sub_category_id])
    render json: @sub_category
  end

  def create_sub_category
    if params["sub_category_id"].present?
      sc = SubCategory.find_by_id(params["sub_category_id"])
    else
      sc = SubCategory.new()
      sc.category_id = params["category_id"]
    end
    sc.name = params["name"]
    sc.save

    @category = sc.category

    get_all_sub_categories
  end

  def update_sub_category_status
    subcat_id = params[:subcat_id]
    status = params[:status]
    if subcat_id.present?
      r = SubCategory.find(subcat_id)
      r.is_active = status
      r.save
    end
    @category = r.category
    get_all_sub_categories
  end

  private

  def set_category_id
    @category = Category.find(params[:category_id])
  end

end 
