
/**
 * Created by Ricevind on 17.01.2017.
 */

(function(){
    window.blog.router = (router, ct) => {

        router.get('/posts', (req, e) => {
            ct.onPostsList.bind(ct);
            ct.onPostsList(req);
            e.stopPropagation();
        });
        router.get('/posts/:id', (req, e) => {
            ct.onPost.bind(ct);
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
