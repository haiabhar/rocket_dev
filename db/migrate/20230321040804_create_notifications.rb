class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications do |t|
      t.references :rule
      t.string :notification_name
      t.string :template_type
      t.string :sequence
      t.string :static_to
      t.string :static_cc
      t.string :static_bcc
      t.string :dynamic_to
      t.string :dynamic_cc
      t.string :dynamic_bcc
      t.string :email_subject
      t.text :email_body
      t.boolean :is_active, default: false
      t.integer :created_by
      t.integer :updated_by
      t.timestamps
    end
  end
end
