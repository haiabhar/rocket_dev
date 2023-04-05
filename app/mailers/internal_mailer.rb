class InternalMailer < ApplicationMailer
	default from: "rocket_support@hpe.com"
  	layout "internal"
  	helper EmailHelper
  	def notification_email
	    @notification = params[:notification]
  		to = @notification[:mail_to].join(",") 
  		cc = @notification[:mail_cc].join(",") 
  		bcc = @notification[:mail_bcc].join(",") 
  		subject = @notification[:subject]
  		@email_body = @notification[:email_body]
  		imgs = @email_body.scan(/src=\"(.*?)\"/).flatten
  		if imgs.length > 0
  			imgs.each do |image_url|
  				uri = URI.parse(image_url)
		  		image = File.basename(uri.path)
		  		if image
			    attachments[image] = uri.open { |f| f.read } 
			    new_url = attachments[image].url
  				@email_body = @email_body.gsub! image_url ,new_url
  				end
  			end
  		end
	    mail(to: to,cc: cc, bcc: bcc, subject: subject)
  	end
end
