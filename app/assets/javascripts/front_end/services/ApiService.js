function ApiService($http){
  var service = this;

  service.topMixes = function(){
    return $http.get('/api/mixes');
  };




};

angular
  .module('app')
  .service('ApiService', ['$http', ApiService]);
