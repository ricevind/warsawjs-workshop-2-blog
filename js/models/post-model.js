(function(){

    let runtime = window.blog.runtime;

    class PostModel {
        constructor(title, body, author) {
            if (typeof(arguments[0]) === 'object' ){
                this.fromJSON(arguments[0])
            } else {
                this._title = title;
                this._body = body;
                this._author = author || 'not provided';
                let now = new Date();
                this._date = now.toISOString().substring(0, 10);
                this._comments = new Map();
            }
        }

        addComment(id, payload) {
            let now = new Date();
            this._comments.set(id, {'author':payload.author, 'body':payload.body, 'date':now.toISOString().substring(0, 10)});
            runtime.emit('modelUpdated');
        }

        deleteComment(id){
            this._comments.delete(id);
            runtime.emit('modelUpdated');
        }

        getComments(){
            return this._comments.entries();
        }

        toJSON(){
            let self = this;
            let comments = self.getComments();
            let commentsToStore = {};
            for (let [id,comment] of comments){
                commentsToStore[id] = comment;
            }

            return {
                'title': self._title,
                'body': self._body,
                'author': self._author,
                'date': self._date,
                'comments': commentsToStore
            }
        }

        fromJSON(post){
            this._title = post.title;
            this._body = post.body;
            this._author = post.author;
            this._date = post.date;
            this._comments = new Map();
            console.log(post.comments)
            for (let id in post.comments) {
                if (post.comments.hasOwnProperty(id)) {
                    console.log(post.comments[id])
                    let comment = post.comments[id];
                    this.addComment(id, comment);
                }
            }
            // postsArray.map(([id,post]) => this.addPost(id, new postConstructor(post)));
        }
    }

    //exports
    window.blog.models.PostModel = PostModel;
})();

//post model containig post Info, Post Owner, Coments
// - can return comments
// - can add comment
// - can delete comment
// - can freeze itself in JSON and unfreez
