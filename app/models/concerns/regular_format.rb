require 'active_support/concern'
module RegularFormat
	def get_emails_from_string strin
		emails = strin.scan(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i)
		return emails
	end
	def string_between_markers marker1, marker2
    	self[/#{Regexp.escape(marker1)}(.*?)#{Regexp.escape(marker2)}/m, 1]
  	end
end