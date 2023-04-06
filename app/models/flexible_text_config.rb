class FlexibleTextConfig < ApplicationRecord
  belongs_to :flexible_text
  default_scope  { where(is_active: true) }

end
