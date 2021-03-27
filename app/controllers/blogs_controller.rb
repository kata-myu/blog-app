class BlogsController < ApplicationController

  def index
    @blogs = Blog.all.order('created_at DESC').page(params[:page]).per(6)
    @q = Blog.ransack(params[:q])
  end

  def new
    @blog_tag = BlogTag.new
  end

  def create
    @blog_tag = BlogTag.new(blog_params)
    @blog_tag.valid?
    if @blog_tag.save
      redirect_to root_path, notice: "記事を投稿しました！"
    else
      render :new
    end
  end

  def show
    @blog = Blog.find(params[:id])
    @comment = @blog.comments.all
  end

  def edit
    @blog = Blog.find(params[:id])
    blog_attributes = @blog.attributes
    @blog_tag = BlogTag.new(blog_attributes)
    @blog_tag.name = @blog.tags&.first&.name
    # blogとtagの関係は多対多になっているので@blog.tags.firstとする必要がある。タグは必須ではないのでボッチ演算子でエラーを回避。
  end

  def update
    @blog = Blog.find(params[:id])
    @blog_tag = BlogTag.new(blog_params)
    if @blog_tag.update(blog_params, @blog)
      redirect_to root_path
    else
      render :edit
    end
  end

  def destroy
    @blog = Blog.find(params[:id])
    if @blog.destroy
      redirect_to root_path
    else
      render :show
    end
  end

  def search 
    return nil if params[:keyword] == ""
    tag = Tag.where(['name LIKE ?', "#{params[:keyword]}%"])
    render json: {keyword: tag}
  end

  def ransack_search
    #OR検索のための記述
    if params[:q]&.dig(:title)  #if params.[:q] && params.[:q][:title]とおなじようなもの
      squished_keyword = params[:q][:title].squish  #余分なスペースを圧縮（スペース一つ分に調整）
      params[:q][:title_cont_any] = squished_keyword.split(" ")  #スペースで区切って文字列にし、配列に入れて返す。
    end

    @q = Blog.ransack(params[:q])
    @blogs = @q.result
  end



  private
  def blog_params
    params.require(:blog_tag).permit(:image, :title, :content, :description, :name).merge(user_id: current_user.id)
  end
end
