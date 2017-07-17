class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.string :body, null: false
      t.integer :rating, null: false
      t.integer :vote_count, null: false

      t.timestamps
      t.belongs_to :location, null: false
      t.belongs_to :user, null: false
    end
  end
end
