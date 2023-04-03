class CreateFlexibleTexts < ActiveRecord::Migration[7.0]
  def change
    create_table :flexible_texts do |t|
      t.string :name
      t.string :code
      t.boolean :is_active, default: true

      t.timestamps
    end
  end
end
