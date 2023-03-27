class Api::NotificationController < ApplicationController
	def get_notifications
    	rule_id = params[:rule_id]
    	if rule_id.present?
	    	notifys = Notification.where(rule_id: rule_id)
		else
			notifys =  []
		end
	    render json: notifys
  	end
  	def create_notification
		notification_id = params[:notification_id]
		notification_name = params[:notification_name]
		sequence = params[:sequence]
		template_type = params[:template_type]
		static_to = params[:static_to]
		static_cc = params[:static_cc]
		static_bcc = params[:static_bcc]
		dynamic_to = params[:dynamic_to]
		dynamic_cc = params[:dynamic_cc]
		dynamic_bcc = params[:dynamic_bcc]
		email_subject = params[:email_subject]
		email_body = params[:email_body]
		rule_id = params[:rule_id]

		checkbox_dynamic_to = params[:checkbox_dynamic_to]
		checkbox_dynamic_cc = params[:checkbox_dynamic_cc]
		checkbox_dynamic_bcc = params[:checkbox_dynamic_bcc]

		if notification_id.present?
			n = Notification.find(notification_id)
		else
			n = Notification.new()
		end
		n.notification_name = notification_name
		n.sequence = sequence
		n.template_type = template_type
		n.static_to = static_to
		n.static_cc = static_cc
		n.static_bcc = static_bcc

		n.dynamic_to = checkbox_dynamic_to == true ? dynamic_to : ""
		n.dynamic_cc = checkbox_dynamic_cc == true ? dynamic_cc : ""
		n.dynamic_bcc = checkbox_dynamic_bcc == true ? dynamic_bcc : ""
		n.email_subject = email_subject
		n.email_body = email_body
		n.rule_id = rule_id
		n.created_by = current_user.id
		n.save

		get_notifications
  	end
  	def get_notification
  		notification_id = params[:notification_id]
    	if notification_id.present?
	    	noti = Notification.find(notification_id)
		else
			noti =  []
		end
	    render json: noti
  	end
end
