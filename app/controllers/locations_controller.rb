class LocationsController < ApplicationController
  def search
    query = "%#{params[:query]}%"
    @search = query
    @locations = Location
      .where('name ilike ? or description ilike ? or city ilike ? or state ilike ?',
             query, query, query, query)
  end
end
