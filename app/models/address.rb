class Address < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :prefecture
  belongs_to :user

  with_options presence: true do
    validates :post_code, format: {with: /\A\d{3}[-]\d{4}\z/}
    validates :prefecture_id, numericality: { only_integer: true }
    validates :city
    validates :address
  end

end
