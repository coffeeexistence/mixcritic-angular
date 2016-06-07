function Users(ApiService, Cache, $q, $timeout){
  var service = this;
  var pendingUsers = {};
  // var userCache = {};
  var cache = Cache.newWorker('users');
  var requestPending = false;

  var assimilate = function (newUsers) { // https://upload.wikimedia.org/wikipedia/en/a/a1/Picard_as_Locutus.jpg
    cache.merge(newUsers);
    for (var id in newUsers) {
      var promise = pendingUsers[id];
      promise.resolve( cache.fetch(id) );
      delete pendingUsers[id];
    }
  };

  var fetchUsers = function () {
    var idBatch = Object.keys(pendingUsers);
    ApiService.users.showBatch(idBatch).then(function(res){
      assimilate(res.data, pendingUsers);
    });
  };

  var pendRequest = function () {
    requestPending = true;
    $timeout(function(){
      fetchUsers();
      requestPending = false;
    }, 50);
  };

  var addUserToQueue = function (id, promise) {
    pendingUsers[id] = promise;
    if (!requestPending) { pendRequest(); }
  };

  service.find = function (id) {
    var q = $q.defer();

    if (cache.exists(id)) {
      q.resolve(cache.fetch(id));
    }
    else {
      addUserToQueue(id, q);
    }

    return q.promise;
  };

};

angular
  .module('app')
  .service('Users', ['ApiService', 'Cache', '$q', '$timeout', Users]);
