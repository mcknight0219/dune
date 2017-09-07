class Carousel < ApplicationRecord
    has_attached_file :image, styles: {}, default_url: ""
    validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
end
