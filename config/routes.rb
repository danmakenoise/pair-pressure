Rails.application.routes.draw do
  root to: 'static_pages#home'

  namespace :api do
    post 'save', to: 'games#save'
  end
end
