class Admin::LocationsController < ApplicationController
  before_action :authorize_user
  def index
    @locations = Location.all
  end

  def show
    @location = Location.find(params[:id])
  end

  protected

  def authorize_user
    if !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end

end
