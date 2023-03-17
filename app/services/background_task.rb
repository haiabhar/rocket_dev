class BackgroundTask

	def self.execute_rules
		lapses = Lapse.where(is_checked: false)

		#Rule.all.each do |rule|
		Rule.where(is_active: true).each do |rule|
			#binding.pry

			t1 = Thread.new{BackgroundTask.get_response_stored(rule.id)}
			p "Thread started"
			
		end			
	end

	#private

	def self.get_response_stored(rule_id)
		rule = Rule.find_by_id(rule_id)

		HumioResponse.fetch_and_save_response(rule.query_string)
			action_logs = Lapse.where(JSON(rule.mongo_query))
			
			action_logs.each do |al|
				new_deed = Deed.new
				new_deed.error_log = al.error_log
				new_deed.log_timestamp = al.log_timestamp
				new_deed.service_name = al.service_name
				new_deed.level = al.level
				new_deed.logg_er = al.logg_er
				new_deed.thread = al.thread
				new_deed.message = al.message
				new_deed.rule_id = rule.id
				new_deed.save
			end
	end

end