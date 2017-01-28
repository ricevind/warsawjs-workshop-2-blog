/**
 * Created by ricevind on 27.01.17.
 */
(function(){

    let runtime = window.blog.runtime;

    class StorageService {

        constructor(adapter) {
            this.adapter = adapter;
        }

        save(postListStringified) {
            this.adapter.put(postListStringified)
                .then((response) => {
                    runtime.emit('dataSaved', response);
                });
        }

        obtain() {
            this.adapter.get()
                .then((data) => {
                    console.log('dataFetched');
                    runtime.emit('fetchedData', data);
                });
        }
    }

    window.blog.services.StorageService = StorageService;
})();