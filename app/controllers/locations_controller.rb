class LocationsController < ApplicationController
  def search
    query = "%#{params[:query].downcase}%"
    @search = query
    @locations = Location
      .where('lower(name) like ? or description like ? or city like ? or state like ?',
             query, query, query, query)
  end
end
