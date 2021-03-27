# README

## blogsテーブル
|Column|Type|Options|
|------|----|-------|
|title|string|null: false|
|content|text|null: false|
|description|string||
### Association
- has_many :blog_tag_relations
- has_many :tags, through: :blog_tag_relation


## tagsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, uniqueness: true|
### Association
- has_many :blog_tag_relations
- has_many :blogs, through: :blog_tag_relation


## blog_tag_relationsテーブル
|Column|Type|Options|
|------|----|-------|
|blog|refarences|null: false, foreign_key: true|
|tag|refarences|null: false, foreign_key: true|
### Association
- belongs_to :blog
- belongs_to :tag