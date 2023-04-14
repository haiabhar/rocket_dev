
module ActionSequence
	def self.kickoff deed_id
		d = Deed.find(deed_id)
		rule_id = d.rule_id if d.present?
		begin
	 		@action_log, @action_status = ActionSequence.const_get("Rule#{rule_id}")._start(d)
		rescue	
			@action_status = "Failed"
			@action_log = "--Start action at #{Time.now}-\n NO ACTION PRESENT  " 
		end
		d.action_performed = true
		d.action_performed_at = Time.now
		d.action_status = @action_status
		d.status = @action_status == "Success" ? "Closed" : "Pending"
		d.action_log = d.action_log.to_s + @action_log
		d.save
		Notification.trigger_after_action(d)
	end

end