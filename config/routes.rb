Rails.application.routes.draw do
  root to: 'home#index'
  get 'home/index'
  get 'rates', :to => 'rate#index'

  resources :orders
  resources :addresses
  resources :products
  resources :product_categories

  get 'packages/confirm', :to  => 'packages#confirm'
  post 'packages/add', :to => 'packages#add_package_item'
  post 'packages/remove', :to => 'packages#remove_package_item'
  get 'packages/address', :to => 'packages#choose_address'
  resources :packages

  get 'myorder', to: 'myorder#index'
  # 购物车
  resource :cart
  post 'cart/new', to: 'carts#add_to_cart'
  get 'cart/address', to: 'carts#choose_address'
  get 'cart/order', to: 'carts#order'
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
