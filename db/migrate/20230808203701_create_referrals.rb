class CreateReferrals < ActiveRecord::Migration[7.0]
  def change
    create_table :referrals do |t|
      t.integer :sender_id
      t.string :recipient_email

      t.timestamps
    end
  end
end
