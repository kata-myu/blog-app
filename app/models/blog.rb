class Blog < ApplicationRecord
  has_many_attached :images
  has_many :blog_tag_relations, dependent: :destroy
  has_many :tags, through: :blog_tag_relations
  has_many :comments
  has_many :likes
  belongs_to :user
end
