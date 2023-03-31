class Api::IncidentController < ApplicationController
  def get_incident_list
    @page = params['_json'].present? ? params['_json'][0].present? ? params['_json'][0] : 1 : 1
    @incidents = Deed.joins("INNER JOIN rules ON rules.id = deeds.rule_id").where(assigned_to: nil).select('deeds.*,rules.name as rule').page(@page)
      @total_count       = @incidents.total_count
      @total_pages       = @incidents.total_pages
      @current_page       = @incidents.current_page
      @limit_value       = @incidents.limit_value
      render json: {incidents: @incidents, total_pages: @total_pages, current_page: @current_page, limit_value: @limit_value, total_count: @total_count}
    #render json: @incidents
  end

  def assign_incident
    if params[:id].present?
      incident_id = params[:id]
      incident = Deed.find(incident_id)
      incident.assigned_to = current_user.id
      incident.assigned_at = Time.now
      incident.save      
    end
    get_incident_list
  end

  def get_myincident_list
    @page = params['_json'].present? ? params['_json'][0].present? ? params['_json'][0] : 1 : 1
    @incidents = Deed.joins("INNER JOIN rules ON rules.id = deeds.rule_id").where(assigned_to: current_user.id).select('deeds.*,rules.name as rule').page(@page)
      @total_count       = @incidents.total_count
      @total_pages       = @incidents.total_pages
      @current_page       = @incidents.current_page
      @limit_value       = @incidents.limit_value
      render json: {incidents: @incidents, total_pages: @total_pages, current_page: @current_page, limit_value: @limit_value, total_count: @total_count}
    #render json: @incidents
  end
  
end
