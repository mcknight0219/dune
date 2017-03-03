# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

case Rails.env
  when 'development'
    Product.create([{name: 'Fish Oil', price: 19.99, weight: 8, category: 'health products', detail: 'Not very useful'},
                    {name: 'Cream', price: 9.99, weight: 4, category: 'cosmetics', detail: 'very good'}])
end