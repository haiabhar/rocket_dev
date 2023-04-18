class Token
	
	require 'selenium-webdriver'

	def self.open_url
		driver = Selenium::WebDriver.for :chrome
		driver.get 'https://common.cloud.hpe.com'

		turl = driver.until { driver.find_element(:name, "username")
		    	if (turl){
		    		driver.find_element(:name, "username").send_keys("hemanth-kumar.mb@hpe.com")
			driver.find_element(:id, "idp-discovery-submit").click()
			driver.find_element(:name, "pf.username").send_keys("hemanth-kumar.mb@hpe.com")
			driver.find_element(:name, "pf.pass").send_keys("smartthinking1!")
			driver.find_element(:class, "btn btn-primary").click()
		    	}
		    

		    
	end
end