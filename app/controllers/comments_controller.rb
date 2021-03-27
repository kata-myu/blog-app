class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      ActionCable.server.broadcast "comments_channel", {comment: @comment}
    end
  end

  private
  def comment_params
    params.permit(:comment).merge(blog_id: params[:blog_id], user_id: current_user.id)
  end
end
