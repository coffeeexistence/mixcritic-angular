function Cache(){
    var service = this;

    var cache = {};
    
    service.newWorker = function(resourceType) {
        
        var resourceTypeCache = service.findOrCreateType(resourceType);
            
        var cacher = {
            exists: function(id) {
                return service.exists(resourceType, id);  
            },
            
            fetch: function(id) {
                if(service.exists(resourceType, id)) {
                    return cache[resourceType][id];
                }
                return false;
            },
            
            store: function(id, resource) {
                resourceTypeCache[id] = resource;
            }, 
            
            merge: function(resourceBatch) {
                angular.merge(resourceTypeCache, resourceBatch);
            }
        };
        
        return cacher;
        
    };
    
    service.findOrCreateType = function(resourceType) {
        if(!service.resourceTypeExists(resourceType)) { cache[resourceType] = {}; }
        return cache[resourceType];
    };

    service.resourceTypeExists = function(resourceType) {
        return (typeof cache[resourceType] !== "undefined");
    };

    service.exists = function(resourceType, id) {
        if (service.resourceTypeExists(resourceType)) {
            if (typeof cache[resourceType][id] !== "undefined") {
                return true;
            }
        }
        return false;
    };
    
    

  
  
  
}

angular
  .module('app')
  .service('Cache', Cache);
