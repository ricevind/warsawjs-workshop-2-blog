(function(){
    let PostComponent = window.blog.components.PostComponent;
    let PostAddFormComponent = window.blog.components.PostAddFormComponent;
    let PostListModel = window.blog.models.PostListModel;
    let PostModel = window.blog.models.PostModel;

    let StorageService = window.blog.services.StorageService;
    let storageAdapter = window.blog.services.localStorageAdapter;

    let runtime = window.blog.runtime;

    class PostController {
        constructor(){
            //services
            this.store = new StorageService(storageAdapter);
            //init
            runtime.on('fetchedData', this._onInit.bind(this));
            // runtime.on('fetchDataFailed', console.log('fetchDataFialed')); TODO: handle fetchDataFaildevent


            this.router = window.blog.router;
            //components
            this.postAddComponet = new PostAddFormComponent({});

            //view intentions handling
            runtime.on('formSent', this._onFormSent.bind(this));
            runtime.on('commentSubmit', this._onCommentSubmit.bind(this));
            runtime.on('deleteComment', this._onCommentDelete.bind(this));

            //model storage handling

            runtime.on('dataSaved', console.log);
        }

        onPostsList(){
            let self = this;
            PostController._resetView('postDestination');
            PostController._resetView('commentFormDestination');
            if (!(document.querySelector('#postInputDestination').innerHTML)){
                self.postAddComponet.render({});
            }
            for (let [id,post] of self.postList.listPosts()) {
                let postDataToRender = {
                    'postTitleInput':post._title,
                    'postBodyInput':post._body,
                    'id':id,
                    'date':post._date
                };

                new PostComponent(postDataToRender);

            }
        }

        onPost(req){
            let self = this;
            PostController._resetView('postDestination');
            PostController._resetView('postInputDestination');
            // PostController._resetView('commentFormDestination');
            let id = req.params.id;
            let postModel = self.postList.getPost(id);
            if (!postModel) {
                self.router.navigate('/posts');
                return;
            }
            let postDataToRender = {
                'postTitleInput':postModel._title,
                'postBodyInput':postModel._body,
                'id':id, 'date':postModel._date
            };

            let postElement = new PostComponent(postDataToRender);
            postElement.renderComments(postModel.getComments());
            self.currentPost = postElement;
            self.currentPostModel = postModel;
        }

        init() {
            let self = this;
            self.store.obtain();
        }

        _onInit(fetchedData) {
            if (fetchedData === 'NO_DATA') {
                this.postList = new PostListModel();
            } else {
                this.postList = new PostListModel(fetchedData);
            }
            this.onPostsList();
            //model storage handling
            runtime.on('modelUpdated', this._onModelUpdated.bind(this));
            //init router
            runtime.emit('listModelLoaded');

        }

        _onFormSent(payload) {
            let id = PostController._generateId();
            let newPost = new PostModel(payload.postTitleInput, payload.postBodyInput);
            this.postList.addPost(id, newPost);
            this.onPostsList();
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

        _onModelUpdated() {
            let dataToStore = this.postList.toString();
            this.store.save(dataToStore);
        }

        static _resetView(destination){
            if (!(typeof (destination) === 'string')){
                destination.innerHTML = ""
            } else {
                let elem = document.querySelector(`#${destination}`);
                if (elem) {
                    elem.innerHTML = "";
                }
            }
        }

        static _generateId(){
            return uuid.v4();
        }
    }

    //exports
    window.blog.controllers.PostController = PostController;
})();

