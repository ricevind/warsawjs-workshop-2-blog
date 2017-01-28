(function(){
    let router = new Grapnel({hashBang: true});
    window.blog.router = router;

    let ct = new window.blog.controllers.PostController();
    ct.init();

    blog.routerInject(router,ct);

})();
