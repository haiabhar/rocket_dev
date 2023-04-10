class Category < ApplicationRecord

	has_many :sub_categories
	has_many :rules
	before_create :set_code

	scope :active, -> { where(is_active: true) }

	def set_code
		self.code = self.name.strip.gsub(" ","_").downcase
	end
end
