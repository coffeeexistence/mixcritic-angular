function MainController($scope, Auth, Session){
	var ctrl = this;

	$scope.session = Session.session;
	Session.addWatchers($scope);
	Session.getCurrentUser();
}

angular
	.module('app')
	.controller('MainController', ['$scope', 'Auth', 'Session', MainController]);
