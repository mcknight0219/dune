class Sku
  acessor_reader :cateogry, :serial_number
  # supported cateogies
  CATEGORIES = %w{ cosmetic health_food electronic other }
  LOOK_UP = CATEGORIES.map { |c| }

  def initialize(*params)
    if params.is_a?(Hash)
      @category = params[:category]
    else
      @category = params.to_s
    end
  end

  # Create new sku based on passed information
  def to_str

  end

  private
  def next_serial_number(category)
    Product.where()
  end
end