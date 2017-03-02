class Sku
  attr_reader :cateogry, :serial_number
  # supported cateogies
  CATEGORIES = %w{ cosmetic health_food electronic other }

  def initialize(*params)
    if params.is_a?(Hash)
      @category = params[:category]
    else
      @category = params.to_s
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
    initial = [0..1].upcase
    skus = Product.find_by_sql ["SELECT sku FORM products WHERE LEFT(sku, 2)= ?", initial]
    if skus.count
      return "#{initial}00001"
    end

    return "#{initial}#{"%05d"%(skus.last[2..-1].to_i + 1)}"
  end
end
