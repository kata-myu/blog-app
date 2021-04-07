class BlogTag
  include ActiveModel::Model
  attr_accessor :title, :content, :images, :description, :name, :id, :created_at, :updated_at, :user_id

  # include ActiveModel::Attributes
  # attribute :id, :integer
  # attribute :created_at, :datetime
  # attribute :updated_at, :datetime


  with_options presence: true do
    validates :title
    validates :content
    validates :images
    validates :name
  end

  def save
    blog = Blog.create(title: title, content: content, images: images, description: description, user_id: user_id)
    tag = Tag.where(name: name).first_or_initialize
    tag.save
    # 既存のレコードがある場合は、既存のレコードを反映させる。

    BlogTagRelation.create(blog_id: blog.id, tag_id: tag.id)
    # Formオブジェクトでは中間テーブルの値も記述して保存する必要がある。
  end
  

  def update(params, blog)
    name = params.delete(:name)
    tag = Tag.where(name: name).first_or_initialize if name.present?
    
    ActiveRecord::Base.transaction do
      tag.save if name.present?
      blog.update!(params)
      blog.blog_tag_relations.destroy_all
      blog.tags << tag if name.present?
      return true
    end
    rescue => e 
      return false
    # transaction内の処理がすべて成功しなかった場合は、rescueの処理を実行する
  end

end