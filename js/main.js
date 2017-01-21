(function(){
    let ct = new window.blog.controllers.PostController();

    let router = new Grapnel({hashBang: true});

    window.blog.router(router,ct);






})();
