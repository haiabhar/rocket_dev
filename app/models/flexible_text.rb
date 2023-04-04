class FlexibleText < ApplicationRecord
	has_many :flexible_text_configs
	before_create :set_code

	scope :active, -> { where(is_active: true) }

	def set_code
		self.code = self.name.strip.gsub(" ","_").upcase
	end
end
