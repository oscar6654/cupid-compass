class UsersController < ApplicationController
  before_action :authorize_user, except: [:show]

  def index
    @users = User.paginate(page: params[:page], per_page: 15)
  end

  def show
    if current_user && current_user.admin?
      @user = User.find(params[:id])
    else
      @user = User.find(current_user[:id])
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(edit_user_params)
      redirect_to user_path(@user), notice: "User Info Updated"
    else
      redirect_to user_path(@user), notice: "Failed to Update!"
    end
  end

  def destroy
    @user = User.find(params[:id]).destroy
    redirect_to users_path, notice: "User Deleted"
  end

  protected

  def authorize_user
    if !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end

  private

  def edit_user_params
    params.require(:user).permit(:first_name, :last_name, :profile_photo)
  end
end
