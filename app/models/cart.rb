class Cart
  attr_accessor :items

  def initialize
    @items ||= []
  end

  def apply(item)
    if item.kind_of?(Array) 
      item.each { |it| apply(it) }
      return
    end
    if item[:op] == '+'
      items << item[:product]
    else 
      items.delete_at(items.index(item[:product]) || items.length)
    end
  end

  def generate_order
  end
end
