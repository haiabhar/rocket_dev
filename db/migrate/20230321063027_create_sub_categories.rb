class CreateSubCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :sub_categories do |t|
      t.string :name
      t.string :code
      t.integer :category_id
      t.boolean :is_active, default: true

      t.timestamps
    end
  end
end
