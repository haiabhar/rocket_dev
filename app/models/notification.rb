include RegularFormat
class Notification < ApplicationRecord
	belongs_to :rule
	
	# sequence "Before Action", "After Action", "After Action Success","After Action failure"

	def self.trigger_before_action rule_id
		n_list	= self.where(rule_id: rule_id, sequence: "Before Action")

		deed_list = Deed.where(rule_id: rule_id, notification_sent: false)
		deed_list.each do |d|
			n_list.each do |n|
				notification = {}
				notification[:mail_to] = []  << n.static_to
				notification[:mail_cc] = []  << n.static_cc
				notification[:mail_bcc] = [] << n.static_bcc
				email_subject	= n.email_subject
				email_body 		= n.email_body

				if n.dynamic_to.present? && n.dynamic_to == "From Humio Log"
					notification[:mail_to] =  notification[:mail_to] + get_emails_from_string(d.error_log)
				end
				if n.dynamic_cc.present? && n.dynamic_cc == "From Humio Log"
					notification[:mail_cc] =  notification[:mail_cc] + get_emails_from_string(d.error_log)
				end
				if n.dynamic_bcc.present? && n.dynamic_bcc == "From Humio Log"
					notification[:mail_bcc] =  notification[:mail_bcc] + get_emails_from_string(d.error_log)
				end

				flex_text_array = get_all_flex_text(n.email_body).flatten
				fts = FlexibleText.where(code: flex_text_array)
				fts.each do |ftc|
					conf = ftc.flexible_text_configs
					conf.each do |ci|
						if ci.config_type == "Character Between"
							str_match = d.error_log.string_between_markers(ci.regex_start, ci.regex_end)
							if str_match.present?
								email_subject = email_subject.gsub! "|#{ftc.code}|" , "#{str_match}"
								email_body = email_body.gsub! "|#{ftc.code}|" , "#{str_match}"
							end
						end
					end
				end



				notification[:subject] = email_subject
				notification[:email_body] = email_body
				if n.template_type == "External"
					ExternalMailer.with(notification: notification).notification_email.deliver_now
				elsif n.template_type == "Internal"
					InternalMailer.with(notification: notification).notification_email.deliver_now
				end
			end
			d.notification_sent = true
			d.save
		end
		
		

	end
	def self.trigger_after_action rule_id,  status
		if status == 'success'
		 n_list	= self.where(rule_id: rule_id, sequence: "After Action Success")
		elsif status == 'failed'
		 n_list	= self.where(rule_id: rule_id, sequence: "After Action failure")
		else
		 n_list	= self.where(rule_id: rule_id, sequence: "After Action")
		end
		deed_list = Deed.where(rule_id: rule_id, notification_sent: false)
		deed_list.each do |d|
			n_list.each do |n|
				notification = {}
				notification[:mail_to] = []  << n.static_to
				notification[:mail_cc] = []  << n.static_cc
				notification[:mail_bcc] = [] << n.static_bcc
				notification[:subject] = n.email_subject
				notification[:email_body] = n.email_body
				if n.dynamic_to.present? && n.dynamic_to == "From Humio Log"
					notification[:mail_to] =  notification[:mail_to] + get_emails_from_string(d.error_log)
				end
				if n.dynamic_cc.present? && n.dynamic_cc == "From Humio Log"
					notification[:mail_cc] =  notification[:mail_cc] + get_emails_from_string(d.error_log)
				end
				if n.dynamic_bcc.present? && n.dynamic_bcc == "From Humio Log"
					notification[:mail_bcc] =  notification[:mail_bcc] + get_emails_from_string(d.error_log)
				end
				if n.template_type == "External"
					ExternalMailer.with(notification: notification).notification_email.deliver_now
				elsif n.template_type == "Internal"
					InternalMailer.with(notification: notification).notification_email.deliver_now
				end
			end
			d.notification_sent = true
			d.save
		end
	end

	
end
