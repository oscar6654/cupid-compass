class LocationsController < ApplicationController
  def search
    query = "%#{params[:query]}%"
    @search = query
    @locations = Location
      .where('name like ? or description like ? or city like ? or state like ?',
             query, query, query, query)
  end
end
