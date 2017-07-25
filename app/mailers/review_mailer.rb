class ReviewMailer < ApplicationMailer
  def new_review(review_data, user_data, location, creator)
    @review = review_data
    @location = location
    @user_data = user_data
    @creator = creator
    mail(
      to: creator.email,
      subject: "A Review for " + location.name + ' was just added!'
    )
  end
end
