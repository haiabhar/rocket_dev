class HumioResponse

	def response_in_json(query_str)

		url = "https://aquila-us-west-2.cloudops.common.cloud.hpe.com/logs/api/v1/repositories/ccsportal/query"
		token = "yzYv4fAD3vZkSKIr9SRe0q3V~QuOfXvgLaNCoyMrtusw40ZnOLR03jBB0mjsF2qE2tZ6k"

		#payload = {"queryString":"subscriptionKeyPattern","start": "30seconds"}
		#payload = {"queryString":"#{query_str}","start": "1minutes"}
		payload = {"queryString":"#{query_str}","start": "3seconds"}

		response = RestClient::Request.execute(method: :post, url: url, headers: { Authorization: "Bearer #{token}", content_type: 'application/json' }, verify_ssl: false, payload: payload.to_json , timeout: 10000000000)
		
		result = JSON.parse(response.body.to_json, quirks_mode: true)
		#result = result.chomp
		res_arr = result.split("\n")
		return_arr = []

		res_arr.each do |res|
			json_obj = eval(res)
			return_arr << json_obj
		end
		
		return return_arr
	end

	def self.log_in_json(log)

		log = log.gsub("null", "nil")
		logs = log.present? ? eval(log) : nil
		return logs
	end

	def self.fetch_and_save_response(query_str)
		humio_res = self.new
		res_value = humio_res.response_in_json(query_str)
		
		res_value.each do |res|

			begin

				logs = HumioResponse.log_in_json(res[:log])
				if res[:log].present?
					
					err_log = Lapse.new
					err_log.error_log = res
					err_log.docker = res[:docker]
					err_log.tag = res[:tag]
					err_log.kubernetes = res[:kubernetes]
					err_log.log_timestamp = res[:@timestamp].to_datetime
					err_log.service_name = logs[:service_name]
					err_log.level = logs[:level]
					err_log.logger = logs[:logger]
					err_log.thread = logs[:thread]
					err_log.message = logs[:message]
					err_log.save
				end
			rescue => error
			end
		end

	end

end