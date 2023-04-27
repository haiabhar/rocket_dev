class ActionSequence::Rule1

  def self._start deed_obj
      @action_status = 'Pending'
      @action_log    = "--Start action at #{Time.now}-\n"
      ######################## STEP 1 - GET SERIAL NUMBER ########################################
      @action_log = @action_log +  "STEP 1 - GETTING THE SERIAL NUMBER\n"
      a = eval(eval(deed_obj.error_log)["log"])
      message = a[:message]
      serial_number = message.match(/serialNumber=(\w+)/)&.captures&.first
      unless serial_number.present?
        serial_number = message.match(/serial:(\w+)/)&.captures&.first
      end
      partNumber = message.match(/partNumber=(\w+)/)&.captures&.first
      deviceType = message.match(/deviceType=(\w+)/)&.captures&.first
      deviceModel = message.match(/deviceModel=(\w+)/)&.captures&.first

      
      ######################## STEP 2 - GET CATEGORY      ########################################
      @action_log = @action_log +  "STEP 2 - GETTING THE CATEGORY\n"
      category =  "COMPUTE" 
      serial_number_exist_code = 0
      
      # ###################### STEP 3 - CHECK SERIAL NUMBER ######################################

      if serial_number.present?
        @action_log = @action_log +  "THE SERIAL NUMBER IS #{serial_number} \n"
        @action_log = @action_log +  "STEP 3 - CHECK THE SERIAL NUMBER IN THE API\n"
        # url = "https://aquila-app-api.common.cloud.hpe.com/activate-order/v1/manufacturing/COMPUTE/serial/#{serial_number}" #prod API
        url = "https://pavo-app-api.common.cloud.hpe.com/activate-order/v1/manufacturing/COMPUTE/serial/#{serial_number}" # test API
        # @action_log = @action_log +  url
        token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IlRFak8tZEJPbThxUDlqRUlxdVE5aXVKX09HTSIsInBpLmF0bSI6IjFmN28ifQ.eyJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiY2xpZW50X2lkIjoiYXF1aWxhLXVzZXItYXV0aCIsImlzcyI6Imh0dHBzOi8vc3NvLmNvbW1vbi5jbG91ZC5ocGUuY29tIiwiYXVkIjoiYXVkIiwibGFzdE5hbWUiOiJQIEsiLCJzdWIiOiJhYmhhci5wLWtAaHBlLmNvbSIsImF1dGhfc291cmNlIjoiaHBlIiwiZ2l2ZW5OYW1lIjoiQWJoYXIiLCJocGVfY2NzX2F0dHJpYnV0ZSI6Im5vIHZhbHVlIiwiaWF0IjoxNjgxMzc4NzA4LCJleHAiOjE2ODEzODU5MDh9.JJAqc2BA0Wo0FnO6d9GQG8078S8o6ulcg4Cp5655NEnwiCeL56J4rheY9AvgZ_C1_crzvx5M8wJBASPTPq_Z8z95tRw6rGoVKJ77vKEFcd2d9GHHit1TvZPenH8PMl-ARh3t_wausk1JjBV1G39B4kVDm9V915QcU2b80TyzhNWXfmfvTTFYnp-wF_YZMMTfFBp3cVYDX-hXdzEL4OAyneueO08rkwO17Iv73ShWcfUNbO0h_eXlBZDFVtht1uLZh4pllz4Wb6o3E6gpShmlzFZDkGbSYeNd2QntLqygZfDxsO7VAKGH569DnHwifw7DTUxWVWZrejWzTJeYOEcikw"
        
        begin
        response = RestClient::Request.execute(method: :get, url: url, headers: { Authorization: "Bearer #{token}", content_type: 'application/json' }, verify_ssl: false, timeout: 1000, accept: "JSON")
        @action_log = @action_log +  "THE SERIAL NUMBER #{serial_number} IS PRESENT IN THE SYSTEM \n"
        @action_log = @action_log +  "ACTION END\n"
        @action_status = "Success"
          # result = JSON.parse(response)
        serial_number_exist_code = response.code
        rescue => e
          serial_number_exist_code = e.response.code
          @action_log = @action_log +  " #{e.response.body} -\n"
          # result = JSON.parse(e.response.body)
          if serial_number_exist_code == 401
            @action_log = @action_log +  " TOKEN EXPIRED - REGENERATING TOKEN\n"
            # token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IlRFak8tZEJPbThxUDlqRUlxdVE5aXVKX09HTSIsInBpLmF0bSI6IjFmN28ifQ.eyJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiY2xpZW50X2lkIjoiYXF1aWxhLXVzZXItYXV0aCIsImlzcyI6Imh0dHBzOi8vc3NvLmNvbW1vbi5jbG91ZC5ocGUuY29tIiwiYXVkIjoiYXVkIiwibGFzdE5hbWUiOiJQIEsiLCJzdWIiOiJhYmhhci5wLWtAaHBlLmNvbSIsImF1dGhfc291cmNlIjoiaHBlIiwiZ2l2ZW5OYW1lIjoiQWJoYXIiLCJocGVfY2NzX2F0dHJpYnV0ZSI6Im5vIHZhbHVlIiwiaWF0IjoxNjgxMjAyMTg5LCJleHAiOjE2ODEyMDkzODl9.Qu36WDiy26NEQ7q2VWyZW_NiPjWHpI76LPVDvmpm6i1cMwb2WAkImwaAQlnDiu-8Ax2fzAb6SIBB7P8fXL1zTN08tc8FREknaDMoOHZWk-ihDkXp37f4Z4unmB3VGZEGrSON0Qg7ZJwuUgXrou5VcdmCyZJGbQ9e2R6_hxpr6W-t_ypYLsqBiiurDlbzqk5Pr6ZrK4VPWXq_y5zgSL6nEm4briwRwBReEg1z6dCOJHFra7tmdDUfr2K5IEvdSoxLAbdzTUvBIzi3iw3kcEhcu3Lfe8_WiXdUbEm-erpu9hbRbkT8cAaBuIhHGqZypqBLPX4204lMmAlD_jcGyyv3mw"
            # retry
          end
        end
      else
        @action_log = @action_log +  "THE SERIAL NUMBER IS NOT PRESENT IN THE LOG \n"
        @action_log = @action_log +  "ACTION END\n"
        @action_status = "Failed"
      end

      
      ######################## STEP 4 - GET PART NUMBER   ########################################
      if serial_number_exist_code == 404
        baseurl = "https://partsurfer.hpe.com/Search.aspx?SearchText=#{serial_number}"
        @action_log = @action_log +  "THE SERIAL NUMBER #{serial_number} IS NOT PRESENT IN THE SYSTEM \n"
        @action_log = @action_log +  "STEP 4 GET PART NUMBER\n"
        # @action_log = @action_log +  baseurl
        productInfo = {}          
        doc = Nokogiri::HTML(URI.open(baseurl))
        doc.css('table td span').each do |span|
            id = span['id']
            if id
                if id == 'ctl00_BodyContentPlaceHolder_lblSerialNumber'
                    productInfo['serial_number'] = span.text
                end
                if id == 'ctl00_BodyContentPlaceHolder_lblProductNumber'
                    productInfo['product_number'] = span.text
                end
                if id == 'ctl00_BodyContentPlaceHolder_lblDescription'
                    productInfo['product_description'] = span.text
                end               
            end
        end
        part_number = productInfo['product_number']

        
        ######################## STEP 5 - UPDATE SERIAL NUMBER #####################################
        if part_number.present?
      @action_log = @action_log +  "STEP 5 - UPDATE SERIAL NUMBER (#{serial_number}) AND PART NUMBER (#{part_number})\n"

          payload = { "manufacturing_data_list": [{"parent_device": {"obj_key": "#{serial_number}-#{part_number}", "serial_number": "#{serial_number}","parent_serial_number": "IGNORED","part_number": "#{part_number}","device_type": "#{category}","boot_version": "","fw_version": "dfasfsd", "mfg_date": "#{Time.now.strftime("%Y-%d-%m %H:%M:%S")}","finger_print": "fdffewf2","extra_attributes": [] }}]}

          @action_log = @action_log +  payload
          # post_url = "https://aquila-app-api.common.cloud.hpe.com:443/activate-order/v1/manufacturing/COMPUTE"
          post_url = "https://pavo-app-api.common.cloud.hpe.com:443/activate-order/v1/manufacturing/COMPUTE"
          begin
          response = RestClient::Request.execute(method: :post, url: post_url, headers: { Authorization: "Bearer #{token}", content_type: 'application/json' }, verify_ssl: false, payload: payload.to_json , timeout: 10000000000)
          @action_log = @action_log +  response.body
          rescue => e
            @action_log = @action_log +  e.response.body
          end
          @action_log = @action_log +  "ACTION END\n"
          @action_status = "Success"

        else
          @action_log = @action_log +  "PART NUMBER IS MISSING \n"
          @action_log = @action_log +  "ACTION END\n"
          @action_status = "Failed"
        end
        
      end

      return @action_log, @action_status

    end
end