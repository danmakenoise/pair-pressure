Rails.application.routes.draw do
  root to: 'static_pages#home'

  namespace :api do
    post 'save', to: 'games#save'
    get 'games/:token', to: 'games#load'
    get 'votes/:token', to: 'votes#load'
    post 'vote', to: 'votes#vote'
  end
end
