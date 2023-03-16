class CreateRules < ActiveRecord::Migration[7.0]
  def change
    create_table :rules do |t|
      t.string :name
      t.string :query_string
      #t.string :exact_match
      t.text :mongo_query
      t.text :build_query
      t.boolean :is_active, default: false
      t.integer :created_by
      t.integer :updated_by

      t.timestamps
    end
  end
end
