function newMix() {
	return {
		restrict: 'E',
		controller: function(ApiService, $scope, Upload){
			var ctrl =  this;

			$scope.setFile = function(element){
				$scope.$apply(function() {
            $scope.mixFile = element.files[0];
        });
			};

			ctrl.submit = function(){
				Upload.upload({url: '/api/mixes.json', data: {mix: $scope.newMix, mix_file: $scope.mixFile} })
	      	.then(function(res){
						debugger;
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
