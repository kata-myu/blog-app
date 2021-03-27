class Tag < ApplicationRecord
  has_many :blog_tag_relations
  has_many :blogs, through: :blog_tag_relations

  validates :name, uniqueness: true
  # 一意性の成約はモデル単位で設ける必要がある
end
