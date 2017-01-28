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
                    runtime.emit('fetchedData', data);
                }, (err) => runtime.emit('fetchedData'), 'NO_DATA');
        }
    }

    window.blog.services.StorageService = StorageService;
})();