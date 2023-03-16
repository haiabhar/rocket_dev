class CreateUserRoles < ActiveRecord::Migration[7.0]
  def change
    create_table :user_roles do |t|
      t.references :user
      t.references :role
      t.boolean :is_primary, default: false
      t.timestamps
    end
  end
end
