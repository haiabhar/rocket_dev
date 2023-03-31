class AddAssigncolumntoDeed < ActiveRecord::Migration[7.0]
  def change
    add_column :deeds, :assigned_to, :integer, after: :deed_reference_id
    add_column :deeds, :assigned_at, :datetime, after: :assigned_to
  end
end
