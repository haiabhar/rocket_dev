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
				notification[:subject] = n.email_subject
				notification[:email_body] = n.email_body
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
