function MainController($scope, Auth){
	var ctrl = this;
	ctrl.loggedIn = false;

	Auth.currentUser().then(function(user) {
            ctrl.user = user;
						ctrl.loggedIn = true;
        }, function(error) {
						ctrl.loggedIn = false;
        });

				$scope.$on('devise:login', function(event, currentUser) {
			    	console.log('devise-login');
						ctrl.loggedIn = true;
						ctrl.user = currentUser;
			        });

	      $scope.$on('devise:new-session', function(event, currentUser) {
	          console.log('devise-new-session');
						ctrl.loggedIn = true;
						ctrl.user = currentUser;
	      });

				$scope.$on('devise:logout', function(event, oldCurrentUser) {
            ctrl.loggedIn = false;
						ctrl.user = {};
        });

}

angular
	.module('app')
	.controller('MainController', MainController);
