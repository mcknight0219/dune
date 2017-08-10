Rails.application.routes.draw do
  root to: 'home#index'
  get 'home/index'
  get 'rates', :to => 'rate#index'
  post 'report', :to => 'report#create'

  resources :orders
  resources :addresses
  resources :products
  resources :product_categories

  get 'packages/confirm', :to  => 'packages#confirm'
  post 'packages/add', :to => 'packages#add_package_item'
  post 'packages/remove', :to => 'packages#remove_package_item'
  get 'packages/address', :to => 'packages#choose_address'
  get 'packages/item', :to => 'packages#item'
  post 'packages/new', :to => 'packages#choose_type'
  resources :packages

  get  'photos/:context/:id', :to => 'photos#show'
  post 'photos/:context/:id', :to => 'photos#create'

  get 'myorder', to: 'myorder#index'
  get 'manage_addresses', to: 'manage_addresses#index'
  # 购物车
  resource :cart
  post 'cart/item', to: 'carts#add_to_cart'
  get 'cart/address', to: 'carts#choose_address'
  get 'cart/order', to: 'carts#order'
  # admin
  get 'dashboard', to: 'dashboard#index'
  # checkout
  resource :payments
  # 联系我们
  get 'contact', to: 'contact#index'
  post 'contact', to: 'contact#create'
  # 查询
  get 'tracking', to: 'tracking#index'
  # 用户
  resources :profiles
  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout'}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
