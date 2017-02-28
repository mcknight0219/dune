Rails.application.routes.draw do
  root to: 'home#index'
  get 'home/index'

  resources :products
  resources :orders
  # 购物车
  resource :cart
  # admin
  get 'dashboard', to: 'dashboard#index'
  # checkout
  resource :checkout
  # 用户
  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout'}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
