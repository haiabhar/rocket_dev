class CreateDeedTransferHistories < ActiveRecord::Migration[7.0]
  def change
    create_table :deed_transfer_histories do |t|
      t.references :deed, index: true
      t.bigint :transferred_from
      t.bigint :transferred_to
      t.bigint :created_by      
      t.timestamps
    end
  end
end
