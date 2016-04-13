function RegistrationController(Auth, $http, $scope, Alert, $state){
	var ctrl = this;

	ctrl.cred = {
		email: '',
    password: '',
    password_confirmation: ''
	};

	$scope.cred = ctrl.cred;

	var config = { headers: {'X-HTTP-Method-Override': 'POST'} };

	ctrl.validatePassword = function(){

	}

	ctrl.readyCredentials = function(){
		return {
			email: ctrl.cred.email,
			password: ctrl.cred.password
		};
	}

	ctrl.submit = function(){
		Auth.register(ctrl.readyCredentials(), config).then(function(registeredUser) {
							Alert.add("Successfully Registered");
							$state.go('mixes');
	        }, function(error) {
	            Alert.add("Registration Unsuccessful");
	        });
	};

}

angular
	.module('app')
	.controller('RegistrationController', RegistrationController);
