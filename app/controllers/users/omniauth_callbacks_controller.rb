# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  # You should configure your model like this:
  # devise :omniauthable, omniauth_providers: [:twitter]

  # You should also create an action method in this controller like this:
  # def twitter
  # end

  def facebook
    authorization
  end

  def google_oauth2
    authorization
  end

# まずouthのgithubを参考にこのメソッドをつくるといい↓
  def authorization
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      sign_in_and_redirect @user, event: :authentication # this will throw if @user is not activated
    else
      session["devise.regist_data"] = {user: @user.attributes}
      session["devise.regist_data"][:user]["password"] = Devise.friendly_token
      @address = @user.build_address
      render template: 'users/registrations/new_address'
    end

    # render template: 'devise/registrations/new' name・email以外で登録するものがある場合、registrations/newへ行く必要があるが、ないなら行く必要なし
  end

  def failure
    redirect_to root_path
  end

  # More info at:
  # https://github.com/heartcombo/devise#omniauth

  # GET|POST /resource/auth/twitter
  # def passthru
  #   super
  # end

  # GET|POST /users/auth/twitter/callback
  # def failure
  #   super
  # end

  # protected

  # The path used when OmniAuth fails
  # def after_omniauth_failure_path_for(scope)
  #   super(scope)
  # end
end
