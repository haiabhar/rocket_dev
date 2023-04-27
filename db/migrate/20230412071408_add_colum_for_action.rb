class AddColumForAction < ActiveRecord::Migration[7.0]
  def change
    add_column :deeds, :action_performed, :boolean, default: false
    add_column :deeds, :action_performed_at, :datetime
    add_column :deeds, :action_status, :string
    add_column :deeds, :action_log, :text
  end
end
