function standaloneCritiqueDisplay() {
	return {
		restrict: 'E',
		scope: {
			critiqueid: '='
		},
		controller: ['ApiService', '$scope', '$stateParams', '$timeout',
		function(ApiService, $scope, $stateParams, $timeout){
			var ctrl =  this;
			$scope.show = false;

			ctrl.load = function(id){
				ApiService.critiques.show(id).then(function(res){
					$scope.critique = res.data;
					$scope.show = true;
				});
			};

			$scope.$watch('critiqueid', function(id) {
	        if (id!==undefined) {ctrl.load(id); }
	    });

  	}],
		controllerAs: 'StandaloneCritiqueCtrl',
		templateUrl: 'mix/critique/standalone_critique_tpl.html',
		link: function(scope, elem, attrs, ctrl) {

		}
	};
}

angular
	.module('app')
	.directive('standaloneCritiqueDisplay', standaloneCritiqueDisplay);
