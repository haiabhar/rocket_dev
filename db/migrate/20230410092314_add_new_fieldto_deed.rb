class AddNewFieldtoDeed < ActiveRecord::Migration[7.0]
  def change
    add_column :deeds, :serial_num, :string
    add_column :deeds, :customer_id, :string
    add_column :deeds, :platform_id, :string
    add_column :deeds, :email, :string
  end
end
