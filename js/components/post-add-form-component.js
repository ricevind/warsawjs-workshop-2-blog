class PostAddFormComponent {
    constructor() {
        this.template = document.getElementById('template-add-form-component').innerHTML;
}

    render () {
        let templateDestination = document.getElementById('postInputDestination');
        templateDestination.innerHTML = this.template;
    }
}


let postInput = new PostAddFormComponent();
postInput.render();
