class CreateFlexibleTextConfigs < ActiveRecord::Migration[7.0]
  def change
    create_table :flexible_text_configs do |t|
      t.references :flexible_text, null: false, foreign_key: true
      t.string :config_type
      t.string :regex_start
      t.string :regex_end
      t.boolean :is_active, default: true
      t.timestamps
    end
  end
end
