function mixPreview() {
	return {
		restrict: 'E',
		scope: {
			mix: '=',
		},
		require: '^mixes',
		controller: ['$attrs', '$scope', '$filter', function($attrs, $scope, $filter){
			var mixCtrl =  this;

			mixCtrl.expanded = false;
			mixCtrl.mix = $scope.mix;
			mixCtrl.wordLimit = 180;

			$scope.mix.short_description = function(){
				var description = $filter('limitTo')($scope.mix.description, mixCtrl.wordLimit);
				if ($scope.mix.description.length > mixCtrl.wordLimit) description+='...';
				return description; // angela dogvacay
			};

			mixCtrl.expand = function(){
				mixCtrl.expanded = true;
			};

  	}],
		controllerAs: 'mixCtrl',
		templateUrl: 'mixes/mix_preview_tpl.html'
	};
}

angular
	.module('app')
	.directive('mixPreview', mixPreview);
