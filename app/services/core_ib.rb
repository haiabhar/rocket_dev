class CoreIb

	def initialize 
		@host 		= 'shr4-vrt-pro-005.houston.hpecorp.net'
		@port 		= 5433
		@username 	= 'SRVC_Quantum_RD'
		@password 	= 'NEWyear$2021'
		@database 	=  'shr4_vrt_pro_005'
	end

	def connection_string

		connection = Vertica.connect( host: @host, ssl: false, port: @port, username: @username, password: @password,  database: @database)
	end

	def query_results(sql)
    	result = connection_string.query(sql)
		connection_string.close
		return result
	end
end