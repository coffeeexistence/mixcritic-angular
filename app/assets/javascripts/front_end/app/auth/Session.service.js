function Session(Auth, Alert){
  var service = this;

  service.session = {
    loggedIn: function(){
      return (typeof this.user !== "undefined")
    }
  };
  
  
  service.addWatchers = function(scope) {
    var loginHandler = function(event, user) {
      console.log(event);
      service.update(user);
    };
    scope.$on('devise:login', loginHandler);
    scope.$on('devise:new-session', loginHandler);
    scope.$on('devise:logout', function(event, oldCurrentUser) {
      console.log('devise-logout');
      service.clear();
    });
  };
  
  service.getCurrentUser = function() {
    Auth.currentUser();
  };
  
  service.logOut = function() {
    var config = { headers: {'X-HTTP-Method-Override': 'DELETE'} };
    Auth.logout(config).then(function(oldUser) {
        Alert.add("Successfully logged out");
    }, function(error) {
        Alert.add('Could not log out');
    });
  };

  service.update = function(userObj) {
    service.session.user = userObj;
    console.log('New session');
    console.log(userObj);
  };

  service.currentUserName = function(){
    if (service.session.loggedIn()) {
      return service.session.user.available_name;
    } else {
      return "(Not logged in)";
    }
  };
  
  service.clear = function() {
    if (service.session.user) {
      delete service.session.user;
    }
  };
  

};

angular
  .module('app')
  .service('Session', ['Auth', 'Alert', Session]);
