class LikesController < ApplicationController
  protect_from_forgery except: :create
  
  def create
    blog = Blog.find(params[:blog_id])
    Like.create(blog_id: params[:blog_id])
    likes = blog.likes
    render json: {likes: likes}
  end
end
