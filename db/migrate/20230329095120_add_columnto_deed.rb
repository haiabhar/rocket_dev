class AddColumntoDeed < ActiveRecord::Migration[7.0]
  def change
    add_column :deeds, :deed_reference_id, :string, after: :rule_id
  end
end
