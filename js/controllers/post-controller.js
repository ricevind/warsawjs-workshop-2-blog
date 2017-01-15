(function(){
    let PostComponent = window.blog.components.PostComponent;
    let PostAddFormComponent = window.blog.components.PostAddFormComponent;
    let PostListModel = window.blog.models.PostListModel;
    let PostModel = window.blog.models.PostModel;

    let runtime = window.blog.runtime;
    let router = window.blog.router;
    console.log(router)
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
                // router.navigate('/posts');
                this.onPostListHandler();
            });

        }

        onPostListHandler(){
            console.log('onpostListHandler callesd')
            runtime.trigger('resetList');
            for (let post in this.postList){
                console.log(post)
                if (this.postList.hasOwnProperty(post)){
                    new PostComponent(this.postList[post])
                }
            }
        }

        onPostHandler(id){
            new PostComponent(this.postList[id])
        }
    }

    //exports
    window.blog.controllers.PostController = PostController;
})();

