class FlexibleTextConfig < ApplicationRecord
  belongs_to :flexible_text
  scope :active, -> { where(is_active: true) }

end
