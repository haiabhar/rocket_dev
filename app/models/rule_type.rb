class RuleType < ApplicationRecord

	before_create :set_code
	has_many :rules
	scope :active, -> { where(is_active: true) }

	def set_code
		self.code = self.name.strip.gsub(" ","_").downcase
	end
end
