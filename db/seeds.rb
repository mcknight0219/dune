# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

case Rails.env
  when 'development'
    product = Product.create([{name: 'Fish Oil', price: 19.99, weight: 8, category: 'health products', detail: 'Not very useful'},
                              {name: 'Cream', price: 9.99, weight: 4, category: 'cosmetics', detail: 'very good'}])

    address = User.first.addresses.create({country: '中国', state: '陕西省', city: '宝鸡', post_code: '721000', address_line1: '43# 4-4-1', phone: '5877078421', mobile: '5877078421'})

    order = User.first.orders.create(items: 2, address: address)
    2.times do
      order_item = order.order_items.create([:product => product.first])
    end

end