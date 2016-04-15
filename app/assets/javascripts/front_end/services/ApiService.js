function ApiService($http){
  var service = this;

  service.topMixes = function(){
    return $http.get('/api/mixes');
  };

  service.getMix = function(id){
    return $http.get('/api/mix/'+id);
  };

  service.getRevision = function(id){
    return $http.get('/api/revision/'+id);
  };

  service.shortUserInfo = function(id){
    return $http.get('/api/short_user_info/'+id);
  };

  service.getCritiqueComments = function(id){
    return $http.get('/api/critique_comments/'+id);
  };

  service.newCritiqueComment = function(comment){
    return $http.post('/api/critique_comment', {critique_comment: comment});
  };


};

angular
  .module('app')
  .service('ApiService', ['$http', ApiService]);
