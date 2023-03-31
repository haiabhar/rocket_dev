class Api::IncidentController < ApplicationController
  def get_incident_list
    @page = params['_json'][0]
    @incidents = Deed.joins("INNER JOIN rules ON rules.id = deeds.rule_id").select('deeds.*,rules.name as rule').page(@page)
      @total_count       = @incidents.total_count
      @total_pages       = @incidents.total_pages
      @current_page       = @incidents.current_page
      @limit_value       = @incidents.limit_value
      render json: {incidents: @incidents, total_pages: @total_pages, current_page: @current_page, limit_value: @limit_value, total_count: @total_count}
    #render json: @incidents
  end
  
end
