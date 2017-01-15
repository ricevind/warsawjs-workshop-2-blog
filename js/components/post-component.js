class PostComponent {
    constructor() {
        this.template = document.getElementById('template-post-component').innerHTML;
    }

    render () {
        let templateDestination = document.getElementById('postDestination');
        templateDestination.innerHTML = this.template   ;
    }
}

let post = new PostComponent()
post.render();
