class Product < ApplicationRecord
  has_many :order_items
  belongs_to :product_category
  validates_presence_of :weight
  scope :active, -> { where(active: true) }
  before_save :default_values

  # we have at most 9 images for one product
  (1..9).each do |n|
    has_attached_file "image#{n}".to_sym
    validates_attachment_content_type "image#{n}".to_sym, content_type: /\Aimage\/.*\z/
  end

  def default_values
    self.sku ||= Sku.new(self.category).to_str
    self.active ||= true
  end

  def as_json(options = nil)
    super.as_json(except: exclude_list).merge(urls_hash)
  end

  def available_images
    (1..9).map { |n| self.send("image#{n}") }.reject { |img| img.size.nil? }
  end

  private

  def exclude_list
    (1..9).reduce([]) { |excludes, n| excludes = excludes + ["image#{n}_file_name", "image#{n}_content_type", "image#{n}_file_size", "image#{n}_updated_at"]}.flatten
  end

  def urls_hash
    (1..9).each_with_object({}) do |n, hsh|
      if self.send("image#{n}").size
        hsh["image#{n}".to_sym] = self.send("image#{n}").url
      end
    end
  end
end
