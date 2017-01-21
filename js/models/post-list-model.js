(function(){
    class PostListModel {
        constructor(postsArray) {
            this._postMap = new Map();
            if (postsArray){
                this.fromJSON(postsArray);
            }
        }

        addPost(id,post){
            this._postMap.set(id, post);
        }

        deletePost(id){
            this._postMap.delete(id);
        }

        getPost(id){
            return this._postMap.get(id);
        }

        listPosts(){
            return this._postMap.entries()
        }

        toJSON(){
            let postListInString = [];
            for (let [id, post] of this.listPosts()){
                postListInString.push([id, post.toJSON()]);
            }
        }

        fromJSON(postsArray, postConstructor){
            postsArray.map(([id,post]) => this.addPost(id, new postConstructor(post)));
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
