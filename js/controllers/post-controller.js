//TODO: Moving callbacks of eventEmmiter events to static methods of controler
(function(){
    let PostComponent = window.blog.components.PostComponent;
    let PostAddFormComponent = window.blog.components.PostAddFormComponent;
    let PostListModel = window.blog.models.PostListModel;
    let PostModel = window.blog.models.PostModel;

    let runtime = window.blog.runtime;
    let router = window.blog.router;

    class PostController {
        constructor(){
            this.currentPost;
            this.currentPostModel;
            //components
            this.postAddComponet = new PostAddFormComponent({});
            //models
            this.postList = new PostListModel();

            runtime.on('formSent', (payload)=>{
                let id = PostController._generateId();
                let newPost = new PostModel(payload.postTitleInput, payload.postBodyInput);
                this.postList.addPost(id, newPost);
                this.onPostsList();
            });

            runtime.on('commentSubmit', this._onCommentSubmit.bind(this));
            runtime.on('deleteComment', this._onCommentDelete.bind(this));
        }

        onPostsList(){
            PostController._resetView('postDestination');
            PostController._resetView('commentFormDestination');
            if (!(document.querySelector('#postInputDestination').innerHTML)){
                this.postAddComponet.render({});
            }
            for (let [id,post] of this.postList.listPosts()) {
                let postDataToRender = {'postTitleInput':post._title, 'postBodyInput':post._body, 'id':id, 'date':post._date};
                new PostComponent(postDataToRender);

            }
        }

        onPost(req){
            PostController._resetView('postDestination');
            PostController._resetView('postInputDestination');
            // PostController._resetView('commentFormDestination');
            let id = +req.params.id;
            let postModel = this.postList.getPost(id);
            let postDataToRender = {'postTitleInput':postModel._title, 'postBodyInput':postModel._body, 'id':id, 'date':postModel._date};
            console.log(postDataToRender)
            let postElement = new PostComponent(postDataToRender);
            postElement.renderComments(postModel.getComments());
            this.currentPost = postElement;
            this.currentPostModel = postModel;
        }

        _onCommentSubmit(payload){
            let post = this.postList.getPost(payload.id);
            let commentId = PostController._generateId();
            post.addComment(commentId, payload);
            payload.id = commentId;
            this.currentPost.renderComment(payload);
        }

        _onCommentDelete(payload){
            PostController._resetView(payload.e.target.parentNode.parentNode.parentNode);
            this.currentPostModel.deleteComment(payload.commentId);
        }

        static _resetView(destination){
            if (!(typeof (destination) === 'string')){
                destination.innerHTML = ""
            } else {
                let elem = document.querySelector(`#${destination}`);
                if (elem) {
                    elem.innerHTML = ""
                }
            }
        }

        static _generateId(){
            return parseInt(Math.random()*1000000000); //TODO: porper ID generation with MD5 or something
        }
    }

    //exports
    window.blog.controllers.PostController = PostController;
})();

