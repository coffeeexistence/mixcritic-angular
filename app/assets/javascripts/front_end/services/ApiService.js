function ApiService($http, Upload){
  var service = this;

  service.users = {
    show:   function(id) { return $http.get('/api/users_data/'+id+'.json'); }
  };

  service.mixes = {
    index:  function() { return $http.get('/api/mixes.json') },
    create: function(data) { return $http.post('/api/mixes.json', data) },
    show:   function(id) { return $http.get('/api/mixes/'+id+'.json') },
    create: function(formData) {
      return Upload.upload({url: '/api/mixes.json', data: formData});
    }
  }

  service.revisions = {
    show:   function(id) { return $http.get('/api/revisions/'+id+'.json'); }
  };

  service.critiques = {
    index:  function(ids) { return $http.get('/api/revisions/'+ids.revision+'/critiques.json'); },
    show:   function(ids) { return $http.get('/api/revisions/'+ids.revision+'/critiques/'+ids.critique+'.json'); },
    create: function(ids, data) { return $http.post('/api/revisions/'+ids.revision+'/critiques.json', data); }
  };

  service.critiqueComments = {
    index:  function(ids) { return $http.get('/api/revisions/'+ids.revision+'/critiques/'+ids.critique+'/comments.json'); },
    show:   function(ids) { return $http.get('/api/revisions/'+ids.revision+'/critiques/'+ids.critique+'/comments/'+ids.comment+'.json'); },
    create: function(ids, data) { return $http.post('/api/revisions/'+ids.revision+'/critiques/'+ids.critique+'/comments.json', data); }
  };

  service.genres = {
    index: function() { return $http.get('/api/genres.json'); }
  };


  service.newCritiqueComment = function(comment){
    return $http.post('/api/critique_comment', {critique_comment: comment});
  };


};

angular
  .module('app')
  .service('ApiService', ['$http', ApiService]);
