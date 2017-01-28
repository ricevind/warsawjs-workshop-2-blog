
/**
 * Created by Ricevind on 17.01.2017.
 */

(function(){
    window.blog.routerInject = (router, ct) => {

        router.get('/posts', (req, e) => {
            ct.onPostsList(req);
            e.stopPropagation();
        });
        router.get('/posts/:id', (req, e) => {
            ct.onPost(req);
            e.stopPropagation();
        });
        router.get('/*', (e) => {
            if (!e.parent) {
                router.navigate('/posts');
            }
        });


        if (!router.path()) {
            router.navigate('/posts');
        }
    }
})();
