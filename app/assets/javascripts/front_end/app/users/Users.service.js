function Users(ApiService, $q, $timeout){
  var service = this;
  var pendingUsers = {};
  var userCache = {};
  var requestPending = false;

  var assimilate = function (newUsers) { // https://upload.wikimedia.org/wikipedia/en/a/a1/Picard_as_Locutus.jpg
    angular.merge(userCache, newUsers);
    for (var id in newUsers) {
      var promise = pendingUsers[id];
      promise.resolve( userCache[id] );
    }
    pendingUsers = [];
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

  var fetchUser = function (id) {
    return ApiService.users.show(id).then(function(res){
      userCache[id] = res.data;
      return userCache[id];
    });
  };

  service.find = function (id) {
    var q = $q.defer();

    if (userCache[id]) {
      q.resolve(userCache[id]);
    }
    else {
      addUserToQueue(id, q);
    }

    return q.promise;
  };

};

angular
  .module('app')
  .service('Users', ['ApiService', '$q', '$timeout', Users]);
