function RequestCollect(ApiService, Cache, $q, $timeout){
    var service = this;

    //RequestCollect.newCollector('users', service.users.showBatch, cache);
    
    service.create = function(collectorParams) {
        var name = collectorParams.name;
        var httpBatchRequest = collectorParams.httpBatchRequest;
        var cache = collectorParams.cache;
        
        var pendingRequests = {};
        var requestPending = false;
        
        var assimilate = function (newBatch) { // https://upload.wikimedia.org/wikipedia/en/a/a1/Picard_as_Locutus.jpg
            cache.merge(newBatch);
            for (var id in newBatch) {
                var promise = pendingRequests[id];
                promise.resolve( cache.fetch(id) );
                delete pendingRequests[id];
            }
        };

        var fetch = function () {
            var idBatch = Object.keys(pendingRequests);
            httpBatchRequest(idBatch).then(function(res){
                assimilate(res.data, pendingRequests);
            });
        };

        var pendRequest = function () {
            requestPending = true;
            $timeout(function(){
                fetch();
                requestPending = false;
            }, 50);
        };

        var addToQueue = function (id, promise) {
            pendingRequests[id] = promise;
            if (!requestPending) { pendRequest(); }
        };
        
        
        return {
            find: function (id) {
                var q = $q.defer();

                if (cache.exists(id)) { q.resolve(cache.fetch(id)) }
                else { addToQueue(id, q) }

                return q.promise;
            }
        };
    };
    

};

angular
  .module('app')
  .service('RequestCollect', ['ApiService', 'Cache', '$q', '$timeout', RequestCollect]);
