class StaticPagesController < ApplicationController
  def index
    @position = params_position

  end

  def google

  end

  def twitch

  end

  private

  def params_position
    params_position = params.permit(:longitude, :latitude)
  end

end
