(function(){
    class PostModel {
        constructor(title, body, author) {
            if (typeof(arguments[0]) === 'object' ){
                this.fromJSON(arguments[0])
            } else {
                this._title = title;
                this._body = body;
                this._author = author || 'not provided';
                this._date = new Date();
                this._comments = new Map();
            }
        }

        addComment(author, body) {
            let id = parseInt(Math.random()*1000000000);
            this._comments.set(id, {'author':author, 'body':body, 'date':new Date()});
        }

        deleteComment(id){
            this._comments.delete(id);
        }

        getComments(){
            return this._comments.entries();
        }

        toJSON(){
            let comments = this.getComments();
            let commentsToStore = [];
            for (let comment of comments){
                commentsToStore.push(comment);
            }

            return {
                'title': this._title,
                'body': this._body,
                'author': this._author,
                'date': this._date,
                'comments': commentsToStore
            }
        }

        fromJSON(post){
            this._title = post.title;
            this._body = post.body;
            this._author = post.author;
            this._date = post.date;
            this._comments = new Map();
            post.comments.map((entry)=>this._comments.set(...entry));
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
