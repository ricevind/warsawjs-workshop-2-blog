/**
 * Created by ricevind on 21.01.17.
 */
(function (window) {
    let runtime = window.blog.runtime;

    class CommentFormComponent {
        constructor(id){
            this._id = id;

            this.destElemPromise = this._setDestinationElement();

            this.template = document.querySelector('#template-CommentsForm-partial').innerHTML;


            let form = this.render();
            form.then(this._setEventListeners.bind(this))

        }

        render(){
            return this.destElemPromise.then((destination)=>{
                this._destinationElement = destination;
            let domParser = new DOMParser();

            let $commentFormDocument = domParser.parseFromString(this.template, 'text/html');
            let $commentForm = $commentFormDocument.querySelector('#commentForm');
            this._destinationElement.appendChild($commentForm);
                return $commentForm;
            });

        }

        _setDestinationElement(){
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

        _setEventListeners(element){
            element.addEventListener('submit', (e)=>{
                e.preventDefault();

                let data = this._getFormData(element);
                runtime.emit('commentSubmit', data );
            });

        }

        _getFormData(formElement){
            let formData = new FormData(formElement); //#commentForm
            let data = {};

            for (let [key, value] of formData){
                data[key] = value
            }

            data.id = this._id;
            return data;
        }
    }

    window.blog.components.CommentFormComponent = CommentFormComponent;
})(window);
