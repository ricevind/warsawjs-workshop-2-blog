/**
 * Created by ricevind on 21.01.17.
 */
(function (window) {
    let runtime = window.blog.runtime;

    class CommentFormComponent {
        constructor(id){
            this._id = id;


            this.destElemPromise = CommentFormComponent.setDestinationElement();


            this.template = document.querySelector('#template-CommentsForm-partial').innerHTML;
        }

        render(){
            this.destElemPromise.then((destination)=>{
                this._destinationElement = destination;
            let domParser = new DOMParser();

            let $commentFormDocument = domParser.parseFromString(this.template, 'text/html');
            let $commentForm = $commentFormDocument.querySelector('#commentForm');
            console.log($commentFormDocument)
            this._destinationElement.appendChild($commentForm);

            $commentForm.addEventListener('submit', (e)=>{
                e.preventDefault();
                let formData = new FormData($commentForm);

                let data = {};
                for (let [key, value] of formData){
                    data[key] = value
                }

                data.id = this._id;

                runtime.emit('commentSubmit', data );
            });


            });

        }

        static setDestinationElement(){
            return new Promise((resolve, reject)=>{


                let setElement = () => {
                    this._destinationElement = document.querySelector('#commentFormDestination');

                    if (!(this._destinationElement)){
                        setTimeout(setElement, 10)
                    }
                    else if (this._destinationElement) {
                        resolve(this._destinationElement)
                    }
                };
                setElement();
            });
        }
    }

    window.blog.components.CommentFormComponent = CommentFormComponent;
})(window);
