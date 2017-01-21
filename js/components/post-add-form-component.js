(function() {




    class PostAddFormComponent {
        constructor(data) {
            this.template = document.getElementById('template-add-form-component').innerHTML;
            this.runtime = window.blog.runtime;

            // this.render(data);
        }

        render (data) {
            let $templateDestination = document.getElementById('postInputDestination');
            let parser = new DOMParser();

            //mustache parse
            let mustachedTemplate = Mustache.render(this.template, data);

            //creating element from mustached template
            let $templateElement = parser.parseFromString(mustachedTemplate, "text/html");

            //appending element to DOM
            let $postInput = $templateElement.getElementById('postInput');

            $postInput.addEventListener('submit', (e)=> {
                e.preventDefault();
                let dataForm = new FormData($postInput);
                let data = {};
                for (let [name, value] of dataForm){
                    data[name] = value;
                }

                $postInput.reset();
                this.runtime.trigger('formSent', data);
            });

            $templateDestination.appendChild($postInput);

        }
    }

    //exports
    window.blog.components.PostAddFormComponent = PostAddFormComponent;


    // let postInput = new PostAddFormComponent({});
})();





