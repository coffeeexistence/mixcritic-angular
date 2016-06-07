function LoginController(Auth, $http, $scope, Alert, $state){
	var ctrl = this;

	ctrl.cred = {
		email: '',
    password: '',
	};

	$scope.cred = ctrl.cred;

	var config = { headers: {'X-HTTP-Method-Override': 'POST'} };

	ctrl.submit = function(){
		Auth.login(ctrl.cred, config).then(function(registeredUser) {
				Alert.add("Successfully Logged In");
	        }, function(error) {
	            Alert.add("Incorrect email or password");
	        });
	};

	$scope.$on('devise:login', function(event, currentUser) {
		$state.go('mixes');
	});

}

angular
	.module('app')
	.controller('LoginController', ['Auth', '$http', '$scope', 'Alert', '$state', LoginController]);
