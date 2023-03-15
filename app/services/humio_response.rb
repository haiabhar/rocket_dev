class HumioResponse

	def response_in_json

		url = "https://aquila-us-west-2.cloudops.common.cloud.hpe.com/logs/api/v1/repositories/ccsportal/query"
		token = "yzYv4fAD3vZkSKIr9SRe0q3V~QuOfXvgLaNCoyMrtusw40ZnOLR03jBB0mjsF2qE2tZ6k"

		payload = {"queryString":"subscriptionKeyPattern","start": "30seconds"}
		#payload = {"queryString":"Device not found","start": "30seconds"}

		response = RestClient::Request.execute(method: :post, url: url, headers: { Authorization: "Bearer #{token}", content_type: 'application/json' }, verify_ssl: false, payload: payload.to_json , timeout: 10000000000)
		
		result = JSON.parse(response.body.to_json, quirks_mode: true)
		res_arr = result.split("\n")
		return_arr = []

		res_arr.each do |res|
			binding.pry
			json_obj = eval(res)
			return_arr << json_obj
		end
		#binding.pry
		return return_arr
	end

	def self.log_in_json(log)

		# return_value = {response: nil, logs: nil}

		# res = self.response_in_json
		# binding.pry
		# return_value[:response] = res
		log = log.gsub("null", "nil")
		logs = eval(log) #if log
		return logs
	end

	def self.fetch_and_save_response
		humio_res = self.new
		#res_value = humio_res.response_in_json
		res_value = [{:log=>                     
   "{\"@timestamp\":\"2023-03-14T09:38:32.009Z\",\"service_name\":\"subscription-management\",\"transaction_id\":\"9f50da8b-8f49-4158-b2d0-74106ce03949\",\"level\":\"INFO\",\"logger\":\"c.a.c.s.c.V1InternalSubscriptionControllerImpl\",\"thread\":\"reactor-http-epoll-2\",\"message\":\"Received get subscription request: platformCustomerId=a55a32d4bb7211ec91e56a2f500f8944, transaction_id=9f50da8b-8f49-4158-b2d0-74106ce03949, username=glcp.solutiontest@gmail.com, subscriptionType=null, subscriptionKey=null, limit=50, offset=0, sku=null, endDateMillis=-1, subscriptionTier=null, app=null, deviceType=null, subscriptionKeyPattern=, evaluationType=null, expire_date_cut_off_in_millis=null, product_type=null, minAvailableQuantity=0, sortBy=null, direction=null\",\"platformCustomerId\":\"a55a32d4bb7211ec91e56a2f500f8944\",\"transaction_id\":\"9f50da8b-8f49-4158-b2d0-74106ce03949\",\"username\":\"glcp.solutiontest@gmail.com\",\"subscriptionType\":null,\"subscriptionKey\":null,\"limit\":50,\"offset\":0,\"sku\":null,\"endDateMillis\":-1,\"subscriptionTier\":null,\"app\":null,\"deviceType\":null,\"subscriptionKeyPattern\":\"\",\"evaluationType\":null,\"expire_date_cut_off_in_millis\":null,\"product_type\":null,\"minAvailableQuantity\":0,\"sortBy\":null,\"direction\":null}\n",
  :stream=>"stdout",         
  :docker=>{:container_id=>"a5868cd503a06e7be7acd4eac82ba02ecae3d1c2efda9b82c2c1a9e54d613141"},
  :kubernetes=>              
   {:container_name=>"subscription-management",
    :namespace_name=>"ccs-system",
    :pod_name=>"subscription-management-68d8d9778b-f4l85",
    :container_image=>"quay.io/ccsportal/subscription-management:2.331.0",
    :container_image_id=>"docker-pullable://quay.io/ccsportal/subscription-management@sha256:b3422d6d26b41212f0a7966ee9cebc00a804422a2a4fb6184990ea05788d0cc3",
    :pod_id=>"372d30ff-778b-4f07-b22d-597337d01a4f",
    :host=>"ip-10-154-126-50.us-west-2.compute.internal",
    :labels=>
     {:app=>"subscription-management",
      :name=>"subscription-management",
      :"pod-template-hash"=>"68d8d9778b",
      :version=>"2.331.0",
      :"acp_infra/uses-proxy"=>"true",
      :"security_istio_io/tlsMode"=>"istio",
      :"service_istio_io/canonical-name"=>"subscription-management",
      :"service_istio_io/canonical-revision"=>"2.331.0"},
    :master_url=>"https://172.20.0.1:443/api",
    :namespace_id=>"dc2c2811-dfba-4220-a993-d07327ed27b2",
    :namespace_labels=>{:"istio-injection"=>"enabled", :"kubernetes_io/metadata_name"=>"ccs-system"}},
  :@timestamp=>"2023-03-14T09:38:32.010+00:00",
  :tag=>
   "ccsportal.var.log.containers.subscription-management-68d8d9778b-f4l85_ccs-system_subscription-management-a5868cd503a06e7be7acd4eac82ba02ecae3d1c2efda9b82c2c1a9e54d613141.log"},
 {:log=>
   "{\"@timestamp\":\"2023-03-14T09:38:23.289Z\",\"service_name\":\"subscription-management\",\"transaction_id\":\"2313874f-9af4-4518-83dd-470e34b5d020\",\"level\":\"INFO\",\"logger\":\"c.a.c.s.c.V1InternalSubscriptionControllerImpl\",\"thread\":\"reactor-http-epoll-3\",\"message\":\"Received get subscription request: platformCustomerId=9169d24ccbb311ec98cc6ed712af3932, transaction_id=2313874f-9af4-4518-83dd-470e34b5d020, username=kiss.gergely@gloster.hu, subscriptionType=null, subscriptionKey=null, limit=10, offset=0, sku=null, endDateMillis=-1, subscriptionTier=null, app=null, deviceType=null, subscriptionKeyPattern=PRSW2249529915, evaluationType=null, expire_date_cut_off_in_millis=null, product_type=DEVICE, minAvailableQuantity=0, sortBy=expiration, direction=asc\",\"platformCustomerId\":\"9169d24ccbb311ec98cc6ed712af3932\",\"transaction_id\":\"2313874f-9af4-4518-83dd-470e34b5d020\",\"username\":\"kiss.gergely@gloster.hu\",\"subscriptionType\":null,\"subscriptionKey\":null,\"limit\":10,\"offset\":0,\"sku\":null,\"endDateMillis\":-1,\"subscriptionTier\":null,\"app\":null,\"deviceType\":null,\"subscriptionKeyPattern\":\"PRSW2249529915\",\"evaluationType\":null,\"expire_date_cut_off_in_millis\":null,\"product_type\":\"DEVICE\",\"minAvailableQuantity\":0,\"sortBy\":\"expiration\",\"direction\":\"asc\"}\n",
  :stream=>"stdout",
  :docker=>{:container_id=>"06c9d737f15d52de2ecfd4229c44ee1cca1fdd14deb259e3a7fde332f9ed897b"},
  :kubernetes=>
   {:container_name=>"subscription-management",
    :namespace_name=>"ccs-system",
    :pod_name=>"subscription-management-68d8d9778b-fjfcr",
    :container_image=>"quay.io/ccsportal/subscription-management:2.331.0",
    :container_image_id=>"docker-pullable://quay.io/ccsportal/subscription-management@sha256:b3422d6d26b41212f0a7966ee9cebc00a804422a2a4fb6184990ea05788d0cc3",
    :pod_id=>"4adbb8e8-16ae-473e-ba1e-8529b5336f16",
    :host=>"ip-10-154-138-185.us-west-2.compute.internal",
    :labels=>
     {:app=>"subscription-management",
      :name=>"subscription-management",
      :"pod-template-hash"=>"68d8d9778b",
      :version=>"2.331.0",
      :"acp_infra/uses-proxy"=>"true",
      :"security_istio_io/tlsMode"=>"istio",
      :"service_istio_io/canonical-name"=>"subscription-management",
      :"service_istio_io/canonical-revision"=>"2.331.0"},
    :master_url=>"https://172.20.0.1:443/api",
    :namespace_id=>"dc2c2811-dfba-4220-a993-d07327ed27b2",
    :namespace_labels=>{:"istio-injection"=>"enabled", :"kubernetes_io/metadata_name"=>"ccs-system"}},
  :@timestamp=>"2023-03-14T09:38:23.289+00:00",
  :tag=>
   "ccsportal.var.log.containers.subscription-management-68d8d9778b-fjfcr_ccs-system_subscription-management-06c9d737f15d52de2ecfd4229c44ee1cca1fdd14deb259e3a7fde332f9ed897b.log"}] 
		


		res_value.each do |res|
			binding.pry
			logs = HumioResponse.log_in_json(res[:log])
			if res[:log].present?
				binding.pry
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
		end

	end

end