function sessionActions () {
	return {
		restrict: 'E',
		require: '^MainCtrl',
		controller: ['$scope', '$state', 'Auth', 'Alert', 'Session', function($scope, $state, Auth, Alert, Session){
            
      var ctrl = this;
      
      $scope.session = Session.session;
      $scope.logOut = Session.logOut;


      $scope.$on('devise:logout', function(event, oldCurrentUser) {
          $state.go('mixes');
      });

  	}],
    controllerAs: 'SessionActionsCtrl',
    template: [
        '<div ng-if="session.loggedIn()" >',
            '<user-chip user-id="session.user.id"></user-chip>',
            '<a href="" class="grey-text padding-1" ng-click="logOut()">Log out</a>',
        '</div>',
        '<div ng-if="!session.loggedIn()">',
            '<a href="" ui-sref="session_new" class="primary-color-text">Login</a> - ',
            '<a href="" ui-sref="session_register" class="primary-color-text">Register</a>',
        '</div>'].join('')
	};
}

angular
	.module('app')
	.directive('sessionActions', sessionActions);
