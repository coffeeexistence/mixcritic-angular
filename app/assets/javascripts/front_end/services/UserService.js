function UserService(){
  var service = this;

  service.session = {
    loggedIn: false
  };

  service.changeSession = function(userObj) {
    service.session = userObj;
  };

  service.currentUserName = function(){
    if (service.session.loggedIn) {
      return service.session.user.available_name;
    } else {
      return "(Not logged in)";
    }
  }

};

angular
  .module('app')
  .service('UserService', UserService);
