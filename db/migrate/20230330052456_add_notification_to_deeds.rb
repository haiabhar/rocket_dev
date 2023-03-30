class AddNotificationToDeeds < ActiveRecord::Migration[7.0]
  def change
    add_column :deeds, :notification_sent, :boolean, default: false
  end
end
