
/**
 * Created by Ricevind on 17.01.2017.
 */

(function(){
    window.blog.router = (router, ct) => {

        router.get('/posts', ct.onPostsList.bind(ct));
        router.get('/posts/:id', ct.onPost.bind(ct));
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
