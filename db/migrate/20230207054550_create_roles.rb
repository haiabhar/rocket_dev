class CreateRoles < ActiveRecord::Migration[7.0]
  def self.up
    create_table :roles do |t|
      t.string :name
      t.string :code
      t.string :description
      t.boolean :is_active, default: true
      t.timestamps
    end
    Role.create(name: "Super Admin",code:"SA",description: "Admin User")
    Role.create(name: "Normal User",code:"NU",description: "Normal User")
    Role.create(name: "Admin",code:"AD",description: "Admin")
  end
  def self.down
    drop_table :roles
  end
end
