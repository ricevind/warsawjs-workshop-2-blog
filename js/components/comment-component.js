/**
 * Created by ricevind on 22.01.17.
 */

(function(){

    let runtime = window.blog.runtime;

    class CommentComponent {
        constructor(commentData) {
            this._template = document.querySelector('#template-comment-component').innerHTML;
            this.destElemPromise = this._setDestinationElement();

            this.render(commentData);
        }

        render(commentData) {
            let domParser = new DOMParser();
            let mustachedTemplate = Mustache.render(this._template, commentData);
            let commentElement = domParser.parseFromString(mustachedTemplate, 'text/html').querySelector('#comment');

            this.destElemPromise.then((destination) => {
                destination.appendChild(commentElement);
            });

            this._setEventListenerForDelete(commentElement)
        }

        _setDestinationElement(){
            return new Promise((resolve) => {
                let setElement = () => {
                    this._destinationElement = document.querySelector('#postComments');

                    if (!(this._destinationElement)) {
                        setTimeout(setElement, 10)
                    }
                    else if (this._destinationElement) {
                        resolve(this._destinationElement)
                    }
                };
                setElement();
            });
        }

        _setEventListenerForDelete(commentElement){
            let closeButton = commentElement.querySelector('#commentDelete');

            let commentId = closeButton.getAttribute('data-commentId');
            closeButton.addEventListener('click', (e) => {
                e.preventDefault();

                let payload = {
                    e:e,
                    commentId:commentId
                };
                runtime.emit('deleteComment', payload);
            })
        }
    }

    window.blog.components.CommentComponent = CommentComponent;
})();