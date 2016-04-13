function Alert($rootScope){
  var service = this;

  service.add = function(message){
    $rootScope.$emit('alert', message);
  };

};

angular
  .module('app')
  .service('Alert', ['$rootScope', Alert]);
