class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable, omniauth_providers: [:facebook, :google_oauth2]

  has_many :blogs, dependent: :destroy
  has_one :address, dependent: :destroy
  has_many :sns_credentials, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy

  validates :nickname, presence: true

  def self.from_omniauth(auth)
    # sns = SnsCredential.where(provider: auth.provider, uid: auth.uid).first_or_create ユーザー登録のビューでパスワード部分を隠すときの条件を作るためにモデルをつくっているので、その必要がないなら不要
    user = User.where(email: auth.info.email).first_or_initialize(nickname: auth.info.name, email: auth.info.email)
    # if user.persisted?
    #   sns.user = user
    #   sns.save
    #   # 先にユーザー登録をしていて、後からSNS認証しようとした場合、sns_credentialsテーブルのuser_idが保存されていないのでuserと紐付けて保存
    # end
    user
    # where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
    #   user.email = auth.info.email
    #   user.password = Devise.friendly_token[0, 20]
    #   user.name = auth.info.name   # assuming the user model has a name
    #   user.image = auth.info.image # assuming the user model has an image
      # If you are using confirmable and the provider(s) you use validate emails, 
      # uncomment the line below to skip the confirmation emails.
      # user.skip_confirmation!
    # end
  end
end
