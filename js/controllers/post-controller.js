(function(){
    let PostComponent = window.blog.components.PostComponent;
    let PostAddFormComponent = window.blog.components.PostAddFormComponent;
    let PostListModel = window.blog.models.PostListModel;
    let PostModel = window.blog.models.PostModel;

    class PostController {
        constructor(){
            //components
            this.postComponent = new PostComponent({});
            this.postAddComponet = new PostAddFormComponent({});
            //models
            this.postListModel = new PostListModel();
            this.postModel = new PostModel();
        }
    }

    //exports
    window.blog.controllers.PostController = PostController;
})();

