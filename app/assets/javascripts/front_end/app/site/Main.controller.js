function MainController($scope, Auth, Session){
	var ctrl = this;
	ctrl.loggedIn = false;

	ctrl.test = "string";

	Auth.currentUser().then(function(user) {
            ctrl.user = user;
						ctrl.loggedIn = true;

						Session.changeSession({
							loggedIn: true,
							user: user
						});

        }, function(error) {
						ctrl.loggedIn = false;

						Session.changeSession({
							loggedIn: false
						});
        });

	$scope.$on('devise:login', function(event, currentUser) {
    	console.log('devise-login');
			ctrl.loggedIn = true;
			ctrl.user = currentUser;

			Session.changeSession({
				loggedIn: true,
				user: currentUser
			});
  });

  $scope.$on('devise:new-session', function(event, currentUser) {
      console.log('devise-new-session');
			ctrl.loggedIn = true;
			ctrl.user = currentUser;

			Session.changeSession({
				loggedIn: true,
				user: currentUser
			});
  });

	$scope.$on('devise:logout', function(event, oldCurrentUser) {
      ctrl.loggedIn = false;
			ctrl.user = {};

			Session.changeSession({
				loggedIn: false
			});

  });

}

angular
	.module('app')
	.controller('MainController', ['$scope', 'Auth', 'Session', MainController]);
