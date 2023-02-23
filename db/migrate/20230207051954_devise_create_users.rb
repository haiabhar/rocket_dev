# frozen_string_literal: true

class DeviseCreateUsers < ActiveRecord::Migration[7.0]
  def change
    
  create_table :users do |t|
      t.string :email, null: false, default: ""
      t.string :full_name
      t.string   :emp_id
      t.string   :address
      t.boolean :is_active, default: true
      t.timestamps null: false

      ## Recoverable
      # t.string   :reset_password_token
      # t.datetime :reset_password_sent_at

      ## Rememberable
      t.string :encrypted_password, null: false, default: ""
      t.datetime :remember_created_at

      ## Trackable
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string   :current_sign_in_ip
      t.string   :last_sign_in_ip
    end

    add_index :users, :email, unique: true
    add_index :users, :emp_id, unique: true
  end
end
