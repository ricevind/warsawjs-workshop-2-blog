(function(){

    let CommentFormComponent = window.blog.components.CommentFormComponent;
    let CommentComponent = window.blog.components.CommentComponent;


    class PostComponent {
        constructor(data) {
            this.template = document.getElementById('template-post-component').innerHTML;

            this.render(data);
        }

        render (data) {
            let $templateDestination = document.getElementById('postDestination');
            let parser = new DOMParser();
            //mustache parse
            let mustachedTemplate = Mustache.render(this.template, data);
            //creating element from mustached template
            let $templateElement = parser.parseFromString(mustachedTemplate, "text/html");

            //appending element to DOM
            $templateDestination.appendChild($templateElement.getElementById('post'));

            if (!(document.querySelector('#postInputDestination').innerHTML)){
                new CommentFormComponent(data.id);

            }
        }

        renderComments(postCommentsEntries){
            for (let [id, comment] of postCommentsEntries){
                comment.id = id;
                new CommentComponent(comment);
            }
        }

        renderComment(payload){
            new CommentComponent(payload);
        }


    }

    //exports
    window.blog.components.PostComponent = PostComponent;

    // let post = new PostComponent({})
})();


