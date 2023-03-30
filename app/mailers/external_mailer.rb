class ExternalMailer < ApplicationMailer
	default from: "rocket_support@hpe.com"
  	layout "external"
  	helper EmailHelper
  	def notification_email
  		@notification = params[:notification]
  		to = @notification[:mail_to].join(",") 
  		cc = @notification[:mail_cc].join(",") 
  		bcc = @notification[:mail_bcc].join(",") 
  		subject = @notification[:subject]
  		@email_body = @notification[:email_body]
	    mail(to: to,cc: cc, bcc: bcc, subject: subject)
  	end
end
