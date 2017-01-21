(function(){
    let PostComponent = window.blog.components.PostComponent;
    let PostAddFormComponent = window.blog.components.PostAddFormComponent;
    let PostListModel = window.blog.models.PostListModel;
    let PostModel = window.blog.models.PostModel;

    let runtime = window.blog.runtime;
    let router = window.blog.router;

    class PostController {
        constructor(){
            this.postList = {};
            //components
            this.postAddComponet = new PostAddFormComponent({});
            //models
            this.postListModel = new PostListModel();
            this.postModel = new PostModel();
            runtime.on('formSent', (payload)=>{
                payload.id = Math.floor(Math.random() * 1000000000);
                this.postList[payload.id] = payload;
                this.onPostsList();
            });

        }

        onPostsList(){
            PostController._resetView('postDestination');
            if (!(document.querySelector('#postInputDestination').innerHTML)){
                this.postAddComponet.render({});
            }
            for (let post in this.postList) {
                if (this.postList.hasOwnProperty(post)){
                    new PostComponent(this.postList[post])
                }
            }
        }

        onPost(req){
            console.log('onpost')
            PostController._resetView('postDestination');
            PostController._resetView('postInputDestination');
            new PostComponent(this.postList[req.params.id]);
        }

        static _resetView(destination){
            document.querySelector(`#${destination}`).innerHTML='';
        }
    }

    //exports
    window.blog.controllers.PostController = PostController;
})();

