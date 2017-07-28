class AddAverageReview < ActiveRecord::Migration[5.1]
  def change
    add_column :locations, :average_review, :float
  end
end
