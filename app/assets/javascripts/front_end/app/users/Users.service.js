function Users(ApiService, $q){
  var service = this;

  service.userCache = {};

  service.fetchUser = function (id) {
    return ApiService.users.show(id).then(function(res){
      service.userCache[id] = res.data;
      return service.userCache[id];
    });
  };

  service.find = function (id) {
    if (service.userCache[id]) {
      var q = $q.defer();
      q.resolve(service.userCache[id]);
      console.log("grabbing "+id+" from user cache");
      return q.promise;
    }
    else {
      console.log('Fetching user '+id)
      return service.fetchUser(id);
    }
  };

};

angular
  .module('app')
  .service('Users', ['ApiService', '$q', Users]);
