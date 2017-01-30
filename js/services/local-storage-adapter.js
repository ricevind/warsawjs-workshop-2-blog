/**
 * Created by ricevind on 27.01.17.
 */
(function() {

    window.blog.services.localStorageAdapter = {
        collectionName: 'postsListModel',
        put: (data) => {
            return new Promise((resolve, reject) => {
                localStorage.setItem(this.collectionName, data);
                if (localStorage.getItem(this.collectionName)) {
                    resolve('data saved');
                } else {
                    reject('data not present, something went wrong');
                }
            });
        },
        get: () => {
            return new Promise((resolve, reject) => {
               let data = localStorage.getItem(this.collectionName);
               if (data) {
                   resolve(data);
               } else {
                   reject('No data could be fetched');
               }
            });
        }
    };

})();