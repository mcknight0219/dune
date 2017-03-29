Rails.application.routes.draw do
  root to: 'home#index'
  get 'home/index'
  get 'rates', :to => 'rate#index'

  resources :products
  resources :orders
  resources :addresses

  get 'packages/confirm', :to  => 'packages#confirm'
  resources :packages

  get 'myorder', to: 'myorder#index'
  # 购物车
  resource :cart
  post 'cart/new', to: 'carts#create_order_for_one'
  # admin
  get 'dashboard', to: 'dashboard#index'
  # checkout
  resource :payments
  # 联系我们
  get 'contact', to: 'contact#index'
  post 'contact', to: 'contact#create'
  # 用户
  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout'}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
