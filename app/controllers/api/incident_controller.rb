class Api::IncidentController < ApplicationController
  def get_incident_list
    search = ''
    inc = ''
    @page = params['_json'][0]
    search = params['_json'][1]
    qry = "deeds.id > 0 and (deeds.status !='Closed' OR deeds.status IS NULL)"
    if search.present? and search != 0
      qry = qry + " AND (deeds.serial_num LIKE '%#{search}%' OR deeds.customer_id LIKE'%#{search}%' OR deeds.platform_id LIKE '%#{search}%' OR deeds.error_log LIKE '%#{search}%' OR deeds.email LIKE '%#{search}%' OR users.full_name LIKE '%#{search}%' OR users.email LIKE '%#{search}%' OR deeds.deed_reference_id = '#{search}')"
      inc = Deed.joins("INNER JOIN users ON users.id = deeds.assigned_to").where("users.full_name LIKE '%#{search}%' OR users.email LIKE '%#{search}%'")
    end
    
    if inc.present?
        @incidents = Deed.joins("INNER JOIN rules ON rules.id = deeds.rule_id INNER JOIN users ON users.id = deeds.assigned_to").where("#{qry}").select('deeds.*,rules.name as rule,users.full_name as owner').order(created_at: :desc).page(@page)
    else
        @incidents = Deed.joins("INNER JOIN rules ON rules.id = deeds.rule_id LEFT JOIN users ON users.id = deeds.assigned_to").where(assigned_to: nil).where("#{qry}").select('deeds.*,rules.name as rule,users.full_name as owner').order(created_at: :desc).page(@page)
    end
    
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
    render json: {}
  end

  def get_myincident_list
    search = ''
    @page = params['_json'][0] 
    search = params['_json'][1]
    qry = "deeds.id > 0 and (deeds.status !='Closed' OR deeds.status IS NULL)"
    if search.present? and search != 0
      qry = qry + " AND (deeds.serial_num LIKE '%#{search}%' OR deeds.customer_id LIKE'%#{search}%' OR deeds.platform_id LIKE '%#{search}%' OR deeds.error_log LIKE '%#{search}%' OR deeds.email = '#{search}' OR deeds.deed_reference_id = '#{search}')"
    end
    @incidents = Deed.joins("INNER JOIN rules ON rules.id = deeds.rule_id INNER JOIN users ON users.id = deeds.assigned_to").where(assigned_to: current_user.id).where("#{qry}").select('deeds.*,rules.name as rule,users.full_name as owner').order(created_at: :desc).page(@page)
      @total_count       = @incidents.total_count
      @total_pages       = @incidents.total_pages
      @current_page       = @incidents.current_page
      @limit_value       = @incidents.limit_value
      render json: {incidents: @incidents, total_pages: @total_pages, current_page: @current_page, limit_value: @limit_value, total_count: @total_count}
    #render json: @incidents
  end

  def search_user_list
    search_text = params[:search]
    if search_text.present?
      @user = User.where("email LIKE ?", "%#{search_text}%").joins(:user_roles).where("user_roles.role_id IN (1,3,4)").group("users.id").pluck('users.email')
    end
    
    render json: @user.present? ? @user : []
  end

  def update_deed
    if params[:deed_id].present?
      deed = Deed.find(params[:deed_id])
      deed.status = params[:status] if params[:status].present?
      notes = params[:notes].to_s + ' -- '+current_user&.email.to_s + ' on ' + Time.now.strftime('%Y-%m-%d %H:%M') if params[:notes].present?
        if Deed.find(params[:deed_id])&.notes.present?
           deed.notes = Deed.find(params[:deed_id])&.notes.to_s + " <br/> "+notes
        else
           deed.notes = notes if params[:notes].present?
        end
      deed.save  
    end
    render json: {}
  end

  def transfer_incident
    if params[:id].present? && params[:assignee].present?
      incident_id = params[:id]
      incident = Deed.find(incident_id)
      old_assignee = incident.assigned_to
      incident.assigned_to = User.find_by(email:params[:assignee])&.id
      incident.assigned_at = Time.now
      if incident.save 
          transfer_his = DeedTransferHistory.new  
          transfer_his.deed_id = incident_id
          transfer_his.transferred_from = old_assignee.present? ? old_assignee : nil
          transfer_his.transferred_to = User.find_by(email:params[:assignee])&.id
          transfer_his.created_by = current_user.id
          transfer_his.save
      end
    end
    render json: {}
  end
  
end
