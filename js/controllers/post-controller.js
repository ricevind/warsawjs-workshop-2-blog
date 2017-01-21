(function(){
    let PostComponent = window.blog.components.PostComponent;
    let PostAddFormComponent = window.blog.components.PostAddFormComponent;
    let PostListModel = window.blog.models.PostListModel;
    let PostModel = window.blog.models.PostModel;

    let runtime = window.blog.runtime;
    let router = window.blog.router;

    class PostController {
        constructor(){
            //components
            this.postAddComponet = new PostAddFormComponent({});
            //models
            this.postList = new PostListModel();
            runtime.on('formSent', (payload)=>{
                let id = Math.floor(Math.random() * 1000000000);
                let newPost = new PostModel(payload.postTitleInput, payload.postBodyInput);
                this.postList.addPost(id, newPost);
                this.onPostsList();
            });
        }

        onPostsList(){
            PostController._resetView('postDestination');
            if (!(document.querySelector('#postInputDestination').innerHTML)){
                this.postAddComponet.render({});
            }
            for (let [id,post] of this.postList.listPosts()) {
                var postDataToRender = {'postTitleInput':post._title, 'postBodyInput':post._body, 'id':id};
                new PostComponent(postDataToRender);

            }
        }

        onPost(req){
            console.log('onpost')
            PostController._resetView('postDestination');
            PostController._resetView('postInputDestination');
            let id = +req.params.id;
            let post = this.postList.getPost(id);
            var postDataToRender = {'postTitleInput':post._title, 'postBodyInput':post._body, 'id':id};
            new PostComponent(postDataToRender);

        }

        static _resetView(destination){
            document.querySelector(`#${destination}`).innerHTML='';
        }
    }

    //exports
    window.blog.controllers.PostController = PostController;
})();

