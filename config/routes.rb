Rails.application.routes.draw do
  root 'static_pages#index'
  get '/google', to: 'static_pages#google', as: :google_path
  get '/twitch', to: 'static_pages#twitch', as: :twitch_path
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
