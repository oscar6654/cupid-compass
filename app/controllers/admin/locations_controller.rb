class Admin::LocationsController < ApplicationController
  before_action :authorize_user
  def index
    @locations = Location.all
  end

  def show
    @location = Location.find(params[:id])
  end

  def edit
    @location_edit = Location.find(params[:id])
    # binding.pry
  end

  def update
    @location = Location.find(params[:id])
    if @location.update_attributes(edit_location_params)
      redirect_to admin_location_path(@location), notice: "Location Info Updated"
    else
      redirect_to admin_location_path(@location), notice: "Failed to Update Location!"
    end
  end

  def destroy
    @location = Location.find(params[:id]).destroy
    redirect_to admin_locations_path, notice: "Location Deleted"
  end

  protected

  def authorize_user
    if !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end

  private

  def edit_location_params
    params.require(:location).permit(:name, :description)
  end

end
