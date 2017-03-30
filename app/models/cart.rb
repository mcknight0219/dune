class Cart
  attr_accessor :items 
  delegate :clear, :size, :empty?, to: :@items
  delegate :to_json, to: :@items

  def initialize(items = [])
    @items = items
  end

  def update(item)
    if items.find(item[:id])
      @items.delete_if { |x| x == item[:id] }
    end
    
    item[:quantity].to_i.times do
      @items << item[:id]
    end
  end

  def delete(id)
    update({:id => id, :quantity => 0})
  end

  def full_form
    # collapse items first
    return [] if @items.empty?
    counts = @items.each_with_object({}) do |i, count|
      if count.key? i
        count[i] = count[i] + 1
      else
        count[i] = 1
      end
    end
    # retrieve information for each product
    counts.map do |id, n|
      { :quantity => n, :product => Product.find(id).as_json }
    end
  end

  def generate_order(user, address)
    return nil if items.empty?
    order = user.orders.create(items: @items.length, address: address)
    begin
      order.save!
      @items.each { |it|
        order_item = order.order_items.create
        order_item.product = Product.find (it)
        order_item.save!
      }
      order
    rescue ActiveRecord::ActiveRecordError
      raise Exceptions::CartError
    end
  end

  
end
