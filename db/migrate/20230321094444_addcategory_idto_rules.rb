class AddcategoryIdtoRules < ActiveRecord::Migration[7.0]
  def change
    add_column :rules, :category_id, :integer
    add_column :rules, :sub_category_id, :integer
    add_column :rules, :rule_type_id, :integer
    add_column :rules, :rule_order_id, :integer
  end
end
