class Product < ApplicationRecord
  has_many :order_items
  validates_presence_of :weight
  validates_inclusion_of :category, in: ["health products", "cosmetics", "clothes"]
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

  def as_json
    super.as_json(except: exclude_list).merge(urls_hash)
  end

  private

  def exclude_list
    (1..9).reduce([]) { |excludes, n| excludes = excludes + ["image#{n}_file_name", "image#{n}_content_type", "image#{n}_file_size", "image#{n}_updated_at"]}.flatten
  end

  def urls_hash
    (1..9).reduce({}) { |hsh, n| hash["image#{n}"] = self.send("image#{n}").url if self.send("image#{n}").size } || {}
  end
end
