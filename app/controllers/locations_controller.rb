class LocationsController < ApplicationController
  def search
    query = "%#{params[:query].downcase}%"
    @search = query
    @locations = Location
      .where('lower(name) like ? or lower(description) like ? or lower(city) like ? or lower(state) like ?',
             query, query, query, query)
  end
end
