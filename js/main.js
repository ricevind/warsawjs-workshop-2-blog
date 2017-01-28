(function(){
    let runtime = window.blog.runtime;
    let router = new Grapnel({hashBang: true});
    window.blog.router = router;

    let ct = new window.blog.controllers.PostController();
    ct.init();

    runtime.on('listModelLoaded', () => blog.routerInject(router,ct));

})();
