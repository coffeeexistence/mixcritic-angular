function ApiService($http){
  var service = this;

  service.mixes = {
    index:  function() { return $http.get('/api/mixes.json') },
    create: function(data) { return $http.post('/api/mixes.json', data) },
    show:   function(id) { return $http.get('/api/mixes/'+id+'.json') },
  };

  service.revisions = {
    show:   function(id) { return $http.get('/api/revision/'+id+'.json'); }
  };

  service.critiques = {
    index:  function(ids) { return $http.get('/api/revision/'+ids.revision+'/critiques.json'); },
    show:   function(ids) { return $http.get('/api/revision/'+ids.revision+'/critiques/'+ids.critique+'.json'); },
    create: function(ids, data) { return $http.post('/api/revision/'+ids.revision+'/critiques.json', data); }
  };

  service.critiqueComments = {
    index:  function(ids) { return $http.get('/api/revision/'+ids.revision+'/critiques/'+ids.critique+'/comments.json'); },
    show:   function(ids) { return $http.get('/api/revision/'+ids.revision+'/critiques/'+ids.critique+'/comments/'+ids.comment+'.json'); },
    create: function(ids, data) { return $http.post('/api/revision/'+ids.revision+'/critiques/'+ids.critique+'/comments.json'); }
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
