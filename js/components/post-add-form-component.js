class PostAddFormComponent {
    constructor(data) {
        this.template = document.getElementById('template-add-form-component').innerHTML;
        this.render(data);
    }

    render (data) {
        let $templateDestination = document.getElementById('postInputDestination');
        let parser = new DOMParser();

        //mustache parse
        let mustachedTemplate = Mustache.render(this.template, data);

        //creating element from mustached template
        let $templateElement = parser.parseFromString(mustachedTemplate, "text/html");

        //appending element to DOM
        $templateDestination.appendChild($templateElement.getElementById('postInput'));

    }
}


let postInput = new PostAddFormComponent({});

