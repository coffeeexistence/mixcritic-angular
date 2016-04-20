function newMix() {
	return {
		restrict: 'E',
		controller: function(ApiService, $scope, Upload, $state){
			var ctrl =  this;

			$scope.loadingBar = false;

			$scope.setFile = function(element){
				$scope.$apply(function() {
            $scope.mixFile = element.files[0];
        });
			};

			ctrl.submit = function(){
				$scope.loadingBar = true;
				Upload.upload({url: '/api/mixes.json', data: {mix: $scope.newMix, mix_file: $scope.mixFile} })
	      	.then(function(res){
						$state.go('mix', {id: res.data.mix_id});
					});
			};

  	},
		controllerAs: 'NewMixCtrl',
		templateUrl: 'mix/new_mix.tpl.html',
	};
}

angular
	.module('app')
	.directive('newMix', newMix);
