(function(){
    let PostComponent = window.blog.components.PostComponent;
    let PostAddFormComponent = window.blog.components.PostAddFormComponent;
    let PostListModel = window.blog.models.PostListModel;
    let PostModel = window.blog.models.PostModel;

    let runtime = window.blog.runtime;



    class PostController {
        constructor(){
            //components
            this.postAddComponet = new PostAddFormComponent({});
            //models
            this.postListModel = new PostListModel();
            this.postModel = new PostModel();

            runtime.on('formSent', (data)=>{new PostComponent(data.payload)});
        }
    }

    //exports
    window.blog.controllers.PostController = PostController;
})();

