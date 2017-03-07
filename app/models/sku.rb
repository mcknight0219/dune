class Sku
  attr_reader :cateogry, :serial_number
  # supported cateogies
  CATEGORIES = %w{ cosmetic health_food electronic other }

  def initialize(*params)
    if params.is_a?(Hash)
      @category = params[:category].to_s
    else
      @category = params.first.to_s
    end
  end

  # Create new sku based on passed information
  def to_str
    "#{@category[0..1].upcase}#{next_serial_number(@category)}"
  end

  private
  # This could be slow but creating new product is
  # only used inside admin
  def next_serial_number(category)
    initial = category[0..1].upcase
    skus = Product.find_by_sql ["SELECT sku FROM products WHERE sku LIKE ?", "#{initial}%"]
    if skus.count == 0
      return "00001"
    end

    return "%05d"%(skus.last.sku[2..-1].to_i + 1)
  end
end
