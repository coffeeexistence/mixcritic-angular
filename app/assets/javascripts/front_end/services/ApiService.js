function ApiService($http){
  var service = this;

  service.topMixes = function(){
    return $http.get('/api/mixes');
  };

  service.getMix = function(id){
    return $http.get('/api/mix/'+id);
  };

  service.shortUserInfo = function(id){
    return $http.get('/api/short_user_info/'+id);
  };


};

angular
  .module('app')
  .service('ApiService', ['$http', ApiService]);
