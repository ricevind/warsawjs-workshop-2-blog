(function(){

    let runtime = window.blog.runtime;
    let PostModel = window.blog.models.PostModel;
    class PostListModel {
        constructor(posts) {
            this._postMap = new Map();
            if (posts){
                let postsArray = JSON.parse(posts)
                this.fromJSON(postsArray);

            }
        }

        addPost(id,post){
            this._postMap.set(id, post);
            runtime.emit('modelUpdated');
        }

        deletePost(id){
            this._postMap.delete(id);
            runtime.emit('modelUpdated');
        }

        getPost(id){
            return this._postMap.get(id);
        }

        listPosts(){
            return this._postMap.entries()
        }

        toString(){
            let self = this;
            let postListInString = {};
            for (let [id, post] of self.listPosts()){
                postListInString[id] = JSON.stringify(post);
            }

            return JSON.stringify(postListInString);
        }

        fromJSON(postsArray) {
            for (let id in postsArray) {
                if (postsArray.hasOwnProperty(id)) {
                    let post = JSON.parse(postsArray[id]);
                    this.addPost(id, new PostModel(post));
                }
            }
            // postsArray.map(([id,post]) => this.addPost(id, new postConstructor(post)));
        }
    }

    //exports
    window.blog.models.PostListModel = PostListModel;
})();

//Holds model for list of posts:
//- has posts list
//- can return all posts
//- can return post by id
//- can remove post
//- can add post
