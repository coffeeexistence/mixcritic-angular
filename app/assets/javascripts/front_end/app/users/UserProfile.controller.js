function UserProfileController(ApiService, $scope, user){
	var ctrl = this;

  $scope.user = user.data;
  var userId = $scope.user.id

	$scope.showLocation = function(){
		return ($scope.user.city && $scope.user.country)
	};

  ApiService.users.critiques(userId).then(function(res){
    $scope.critiqueIds = res.data;
		$scope.showCritiques = true;
		console.log('we now have critique ids');
  });

  ApiService.users.mixes(userId).then(function(res){
    $scope.mixIds = res.data;
		$scope.showMixes = true;
  });

}

angular
	.module('app')
	.controller('UserProfileController', ['ApiService', '$scope', 'user', UserProfileController]);
