class CreateDeeds < ActiveRecord::Migration[7.0]
  def change
    create_table :deeds do |t|
      t.text :error_log
      t.datetime :log_timestamp
      t.string :service_name
      t.string :level
      t.string :logg_er
      t.string :thread
      t.text :message
      t.integer :rule_id

      t.timestamps
    end
  end
end
