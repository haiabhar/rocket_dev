class Rule < ApplicationRecord
	has_many :notifications
	belongs_to :category
	belongs_to :rule_type
	belongs_to :rule_order
	belongs_to :sub_category
end
