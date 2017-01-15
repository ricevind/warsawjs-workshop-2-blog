(function(){
    let Controller = window.blog.controllers.PostController;

    let controller = new Controller();

    let router = window.blog.router;

    window.blog.runtime.on('resetList',()=>document.getElementById('postDestination').innerHTML = '' )
    // router.listen = {
    //     'post/:id?': (req) => console.log(req.params.id)
    // }
    router.get('/posts', ()=>{
        console.log('post url called');
        document.getElementById('postDestination').innerHTML = '';
        controller.onPostListHandler()
    });

    router.get('/posts/:id', (req)=>{
        console.log(`post ${req.params.id}`)
        document.getElementById('postDestination').innerHTML = '';
        controller.onPostHandler(req.params.id);
    });

    if (!router.path()) {
        router.navigate('/posts')
    }

})();
