Rails.application.routes.draw do
  root to: 'home#index'
  get 'home/index'

  resources :products
  # 购物车
  resource :cart
  # admin
  get 'dashboard', to: 'dashboard#index'
  # stripe
  resources :charges
  # 用户
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
