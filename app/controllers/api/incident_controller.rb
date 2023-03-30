class Api::IncidentController < ApplicationController
  def get_incident_list
    @incidents = Deed.joins("INNER JOIN rules ON rules.id = deeds.rule_id").select('deeds.*,rules.name as rule')
    render json: @incidents
  end
  
end
