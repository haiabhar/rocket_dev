class AddcolumntoDeed < ActiveRecord::Migration[7.0]
  def change
    add_column :deeds, :sfdc_case_number, :string
    add_column :deeds, :sfdc_internal_case_number, :string
    add_column :deeds, :status, :string
    add_column :deeds, :transfer, :integer, :default => 0
    add_column :deeds, :notes, :text
  end
end
