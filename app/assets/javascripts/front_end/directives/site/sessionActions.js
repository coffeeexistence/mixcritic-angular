function sessionActions () {
	return {
		restrict: 'E',
		require: '^MainCtrl',
		controller: function($scope, $state, Auth, Alert){
      var ctrl = this;

      ctrl.logout = function(){
        console.log('logging out');
        var config = { headers: {'X-HTTP-Method-Override': 'DELETE'} };
        Auth.logout(config).then(function(oldUser) {
            Alert.add("Successfully logged out");
        }, function(error) {
            Alert.add('Could not log out');
        });
      };

      $scope.$on('devise:logout', function(event, oldCurrentUser) {
          $state.go('mixes');
      });

  	},
		controllerAs: 'SessionActionsCtrl',
		template: [
      '<div ng-if="MainCtrl.loggedIn">',
        '<user-chip user-id="MainCtrl.user.id"></user-chip>',
        '  <a href="" class="grey-text" ng-click="SessionActionsCtrl.logout()">Log out</a>',
      '</div>',
      '<div ng-if="!MainCtrl.loggedIn">',
        '<a href="" ui-sref="session_new">Log in</a><br />',
        '<a href="" ui-sref="session_register">Register</a>',
      '</div>'
		].join('')

	};
}

angular
	.module('app')
	.directive('sessionActions', sessionActions);
