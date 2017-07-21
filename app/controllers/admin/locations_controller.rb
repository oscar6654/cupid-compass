class Admin::LocationsController < ApplicationController
  before_action :authorize_user
  def index
    # @locations = Location.paginate(:page => params[:page], :per_page => 25)
    @locations = Location.all
    # @creator = @locations.user

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
