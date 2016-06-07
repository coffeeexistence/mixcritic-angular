function ApiService($http, ResourceManger){
  var service = this;
  
  service.userManager = ResourceManger.create({
    name: 'users', 
    httpBatchRequest: function(ids){
      return $http({
          method: 'GET',
          url: '/api/users/batch.json',
          params: {
            ids: JSON.stringify(ids)
          }
        });
    }
  });
  

  
  service.users = {
    show:   function(id) { 
      return service.userManager.find(id);
    },
    showBatch: function(ids) {
      return $http({
          method: 'GET',
          url: '/api/users/batch.json',
          params: {
            ids: JSON.stringify(ids)
          }
        });
    },
    profile:   function(id) { return $http.get('/api/users/'+id+'/profile.json'); },
    critiques: function(id) { return $http.get('/api/users/'+id+'/critiques.json'); },
    mixes: function(id) { return $http.get('/api/users/'+id+'/mixes.json'); },
  };

  service.mixes = {
    index:  function() { return $http.get('/api/mixes.json') },
    create: function(data) { return $http.post('/api/mixes.json', data) },
    show:   function(id) { return $http.get('/api/mixes/'+id+'.json') }
  }

  service.revisions = {
    show:   function(id) { return $http.get('/api/revisions/'+id+'.json'); }
  };

  service.critiques = {
    index:  function(revisonId) { return $http.get('/api/revisions/'+revisonId+'/critiques.json'); },
    show:   function(id) { return $http.get('/api/critiques/'+id+'.json'); },
    create: function(revisonId, data) { return $http.post('/api/revisions/'+revisonId+'/critiques.json', data); }
  };

  service.critiqueComments = {
    index:  function(ids) { return $http.get('/api/critiques/'+ids.critique+'/comments.json'); },
    show:   function(ids) { return $http.get('/api/critiques/'+ids.critique+'/comments/'+ids.comment+'.json'); },
    create: function(ids, data) { return $http.post('/api/critiques/'+ids.critique+'/comments.json', data); }
  };

  service.genres = {
    index: function() { return $http.get('/api/genres.json'); }
  };



};

angular
  .module('app')
  .service('ApiService', ['$http', 'ResourceManager', ApiService]);
