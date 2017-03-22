class Cart
  attr_accessor :items 
  delegate :clear, :size, :empty?, to: :@items
  delegate :to_json, to: :@items

  def initialize(items = [])
    @items = items
  end

  def apply(item)
    if item.kind_of?(Array) 
      item.each { |it| apply(it) }
      return
    end
    
    if item[:op] == '+'
      items << item[:product]
    elsif item[:op] == 'r'
      items.delete_if { |i| i == item[:product] }
    else
      #无法删除不存在的
      raise Exceptions::CartError if items.index(item[:product]).nil?
      items.delete_at(items.index(item[:product]) || items.length)
    end
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
      {:quantity => n, :product => Product.find(id).as_json(:except => [:created_at, :updated_at])}
    end
  end

  def generate_order(user)
    return nil if @items.empty?
    raise Exceptions::CartError unless @items.length < 100
    order = user.orders.create(items: @items.length)
    begin
      order.save!
      @items.each { |it|
        order_item = order.order_items.create
        order_item.product = Product.find_by sku: it
        order_item.save!
      }

      return order
    rescue ActiveRecord::ActiveRecordError
      raise Exceptions::CartError
    end
  end

  
end
