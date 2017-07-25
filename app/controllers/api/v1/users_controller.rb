class Api::V1::UsersController < ApplicationController
  def index
    if current_user
      render json: { auth: true }
    else
      render json: { auth: false }
    end
  end
end
