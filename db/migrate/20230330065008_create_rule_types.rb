class CreateRuleTypes < ActiveRecord::Migration[7.0]
  def change
    create_table :rule_types do |t|
      t.string :name
      t.string :code
      t.boolean :is_active, default: true

      t.timestamps
    end
  end
end
